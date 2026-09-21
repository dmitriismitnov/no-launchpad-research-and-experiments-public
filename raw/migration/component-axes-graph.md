# Component Axes Graph

```mermaid
flowchart LR
  V[visual variants] --- Z[size variants]
  V -.-> T[theme context]
  Z -.-> D[density context]
  T --> R[resolved component rules]
  D --> R
  H[_hover / focus / active] -.-> R
  B[disabled / loading / invalid] == modifies or overrides ==> R
```

Mermaid показывает слои, но не полное 3D-пространство возможных сочетаний.

Связь между variants означает одну базовую component combination, а не заранее сгенерированную сущность. System contexts уточняют соответствующие properties; interaction conditions действуют property-local; behavior states меняют только применимые rules или перекрывают interaction response.
