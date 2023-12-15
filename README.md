# Biblia API

### ¿Qué es?

Es una API que devuelve la Biblia versión **Reina Valera 1909** en formato JSON.

### ¿Cómo usarla?

La API se encuentra en la siguiente dirección: <https://biblia.my.to/book>.

## Endpoints

| Método | Endpoint | Descripción |
| --- | --- | --- |
| ![GET](https://img.shields.io/badge/GET-0D96F6?style=for-the-badge) | [/book](https://biblia.my.to/book) | Devuelve todos los libros de la Biblia. |

### Responses

| Código | Response |
| --- | --- |
| ![200](https://img.shields.io/badge/200-00C853?style=for-the-badge) | [Book[]](#esquemas) |

---

| Método | Endpoint | Descripción |
| --- | --- | --- |
| ![GET](https://img.shields.io/badge/GET-0D96F6?style=for-the-badge) | [/book/:bookId](https://biblia.my.to/book/gen) | Devuelve el libro del ID especificado. |

### Responses

| Código | Response |
| --- | --- |
| ![200](https://img.shields.io/badge/200-00C853?style=for-the-badge) | [Book](#esquemas) |
| ![404](https://img.shields.io/badge/404-FF1744?style=for-the-badge) | Recurso no encontrado |

---

| Método | Endpoint | Descripción |
| --- | --- | --- |
| ![GET](https://img.shields.io/badge/GET-0D96F6?style=for-the-badge) | [/book/:bookId/chapter](https://biblia.my.to/book/gen/chapter) | Devuelve todos los capítulos del libro del ID especificado. |

### Responses

| Código | Response |
| --- | --- |
| ![200](https://img.shields.io/badge/200-00C853?style=for-the-badge) | [Chapter[]](#esquemas) |

---

| Método | Endpoint | Descripción |
| --- | --- | --- |
| ![GET](https://img.shields.io/badge/GET-0D96F6?style=for-the-badge) | [/book/:bookId/chapter/:chapterId](https://biblia.my.to/book/gen/chapter/1) | Devuelve el capítulo del ID especificado. |

### Responses

| Código | Response |
| --- | --- |
| ![200](https://img.shields.io/badge/200-00C853?style=for-the-badge) | [Chapter](#esquemas) |
| ![404](https://img.shields.io/badge/404-FF1744?style=for-the-badge) | Recurso no encontrado |

---

| Método | Endpoint | Descripción |
| --- | --- | --- |
| ![GET](https://img.shields.io/badge/GET-0D96F6?style=for-the-badge) | [/book/:bookId/chapter/:chapterId/verse](https://biblia.my.to/book/gen/chapter/1/verse) | Devuelve todos los versículos del capítulo del ID especificado. |

### Responses

| Código | Response |
| --- | --- |
| ![200](https://img.shields.io/badge/200-00C853?style=for-the-badge) | [Verse[]](#esquemas) |

---

| Método | Endpoint | Descripción |
| --- | --- | --- |
| ![GET](https://img.shields.io/badge/GET-0D96F6?style=for-the-badge) | [/book/:bookId/chapter/:chapterId/verse/:verseId](https://biblia.my.to/book/gen/chapter/1/verse/1) | Devuelve el versículo de el/los ID especificados. :verseId soporta rangos (ej. 1-3,5). |

### Responses

| Código | Response |
| --- | --- |
| ![200](https://img.shields.io/badge/200-00C853?style=for-the-badge) | [Verse](#esquemas) |

---

| Método | Endpoint | Descripción |
| --- | --- | --- |
| ![GET](https://img.shields.io/badge/GET-0D96F6?style=for-the-badge) | [/verse/:id](https://biblia.my.to/verse/gen.1.1) | Devuelve el versículo del ID especificado. |

### Responses

| Código | Response |
| --- | --- |
| ![200](https://img.shields.io/badge/200-00C853?style=for-the-badge) | [Verse](#esquemas) |
| ![404](https://img.shields.io/badge/404-FF1744?style=for-the-badge) | Verse not found |


## Esquemas

```typescript
interface Book =  {
  id:           number  // ID del libro
  abbreviation: number  // abreviatura del libro
  name:         string  // nombre del libro
  nameLong:     string  // nombre largo del libro
}
```

```typescript
interface Chapter =  {
  id:         number  // ID del capítulo
  number:     number  // número del capítulo
  reference:  string  // referencia del capítulo
  bookId:     number  // ID del libro
}
```

```typescript
interface Verse =  {
  id:         number  // ID del versículo
  number:     number  // número del versículo
  reference:  string  // referencia del versículo
  chapterId:  number  // ID del capítulo
}
```