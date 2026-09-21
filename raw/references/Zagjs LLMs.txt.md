---
title: "LLMs.txt"
source: "https://zagjs.com/overview/llms-txt"
author:
published:
created: 2026-09-20
description: "How to get tools like Cursor, Windstatic, GitHub Copilot, ChatGPT, and Claude to understand Zag JS."
tags:
  - "clippings"
---

## What is LLMs.txt?

We support [LLMs.txt](https://llmstxt.org/) files for making the Zag JS documentation available to large language models (LLMs). This feature helps AI tools better understand our component library, its APIs, and usage patterns.

## Available Routes

We provide several LLMs.txt routes to help AI tools access our documentation:

- [`/llms.txt`](https://zagjs.com/llms.txt) - Contains a structured overview of all components and their documentation links
- [`/llms-full.txt`](https://zagjs.com/llms-full.txt) - Provides comprehensive documentation including implementation details and examples
- [`/llms-react.txt`](https://zagjs.com/llms-react.txt) - React-specific documentation and implementation details
- [`/llms-solid.txt`](https://zagjs.com/llms-solid.txt) - SolidJS-specific documentation and implementation details
- [`/llms-vue.txt`](https://zagjs.com/llms-vue.txt) - Vue-specific documentation and implementation details
- [`/llms-svelte.txt`](https://zagjs.com/llms-svelte.txt) - Svelte-specific documentation and implementation details

## Usage with AI Tools

### Cursor

Use the `@Docs` feature in Cursor to include the LLMs.txt files in your project. This helps Cursor provide more accurate code suggestions and documentation for Zag JS components.

[Read more about @Docs in Cursor](https://docs.cursor.com/context/@-symbols/@-docs)

### Windstatic

Reference the LLMs.txt files using `@` or in your `.windsurfrules` files to enhance Windstatic's understanding of Zag JS components.

[Read more about Windstatic Memories](https://docs.codeium.com/windsurf/memories#memories-and-rules)

### Other AI Tools

Any AI tool that supports LLMs.txt can use these routes to better understand Zag JS. Simply point your tool to any of the routes above based on your framework of choice.

[Edit this page on GitHub](https://github.com/chakra-ui/zag/edit/main/website/data/overview/llms-txt.mdx)
