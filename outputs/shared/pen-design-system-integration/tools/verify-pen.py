"""Equivalence checker for PEN token migrations.

Computes one line per node for the properties a migration may rewrite and
reports order-independent hashes, so a migrated document can be compared
against its pre-migration copy regardless of variable names/aliases.

Usage: python3 verify-pen.py <file.pen> [--dump]
"""
import json
import sys


def jsnum(v):
    if v is None:
        return ""
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int,)):
        return str(v)
    if isinstance(v, float):
        if v == int(v):
            return str(int(v))
        return repr(v)
    return json.dumps(v, separators=(",", ":"), ensure_ascii=False)


def load(path):
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def make_resolver(doc):
    variables = doc.get("variables", {})

    def resolve(value, theme):
        if isinstance(value, str):
            name = value[1:] if value.startswith("$") else None
            if name is None or name not in variables:
                return value
            raw = variables[name]["value"]
            return resolve(raw, theme)
        if isinstance(value, list):
            branch = None
            for item in value:
                if isinstance(item, dict) and item.get("theme", {}).get("mode") == theme:
                    branch = item
                    break
            if branch is None:
                for item in value:
                    if isinstance(item, dict) and "theme" not in item:
                        branch = item
                        break
            if branch is None and value:
                branch = value[0]
            return resolve(branch.get("value"), theme) if isinstance(branch, dict) else None
        return value

    return resolve


def paint(value, theme, resolve):
    if value is None:
        return ""
    resolved = resolve(value, theme)
    if resolved is None:
        return ""
    if isinstance(resolved, str):
        return resolved
    if isinstance(resolved, list):
        return "+".join(paint(item, theme, resolve) for item in resolved)
    if resolved.get("type") == "gradient":
        return ",".join(str(resolve(c.get("color"), theme)) for c in resolved.get("colors", []))
    for key in ("color", "url", "type"):
        if key in resolved:
            return str(resolve(resolved[key], theme))
    return ""


def effects(value, theme, resolve):
    if value is None:
        return ""
    items = value if isinstance(value, list) else [value]
    return ",".join(paint(e.get("color"), theme, resolve) if e.get("type") == "shadow" else "" for e in items)


def main():
    doc = load(sys.argv[1])
    resolve = make_resolver(doc)
    lines = []

    def walk(node, theme):
        if isinstance(node, list):
            for item in node:
                walk(item, theme)
            return
        if not isinstance(node, dict):
            return
        theme = node.get("theme", {}).get("mode", theme)
        padding = node.get("padding")
        if isinstance(padding, list):
            padding = ",".join(jsnum(resolve(p, theme)) for p in padding)
        else:
            padding = jsnum(resolve(padding, theme))
        stroke_width = node.get("strokeWidth")
        if isinstance(stroke_width, dict):
            stroke_width = "{" + ",".join(f'{k}:{jsnum(resolve(v, theme))}' for k, v in stroke_width.items()) + "}"
        else:
            stroke_width = jsnum(resolve(stroke_width, theme))
        lines.append("|".join([
            paint(node.get("fill"), theme, resolve),
            paint(node.get("stroke"), theme, resolve),
            effects(node.get("effect"), theme, resolve),
            jsnum(resolve(node.get("cornerRadius"), theme)),
            stroke_width,
            jsnum(resolve(node.get("gap"), theme)),
            padding,
            jsnum(resolve(node.get("opacity"), theme)),
            str(resolve(node.get("fontFamily"), theme) or ""),
            str(resolve(node.get("fontWeight"), theme) if resolve(node.get("fontWeight"), theme) is not None else ""),
            jsnum(resolve(node.get("fontSize"), theme)),
            jsnum(resolve(node.get("lineHeight"), theme)),
            jsnum(resolve(node.get("letterSpacing"), theme)),
        ]))
        for child in node.get("children", []):
            walk(child, theme)

    for child in doc["children"]:
        walk(child, "light")

    def fnv(text):
        h = 5381
        for ch in text:
            h = ((h * 33) ^ ord(ch)) & 0xFFFFFFFF
        return h

    ordered = 5381
    total = 0
    distinct = set()
    for line in lines:
        for ch in line:
            ordered = ((ordered * 33) ^ ord(ch)) & 0xFFFFFFFF
        total = (total + fnv(line)) & 0xFFFFFFFF
        distinct.add(line)

    print(json.dumps({"file": sys.argv[1], "count": len(lines), "ordered": ordered, "sum": total, "distinct": len(distinct)}))

    if "--dump" in sys.argv:
        with open(sys.argv[1] + ".lines.txt", "w", encoding="utf-8") as fh:
            fh.write("\n".join(lines))


main()
