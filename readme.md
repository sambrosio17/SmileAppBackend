# Rest Api Gestionale Animazione

Due tipi di oggetti:

- Utente (user);
- Festa (party)

# Utente (struttura)

L'oggetto utente è così composto:

```javascript
{
    username: { type: String, require: true, unique: true },
    nome: { type: String, require: true },
    cognome: { type: String, require: true },
    password: { type: String, require: true, minlength: 6 },
    hasCar: { type: Boolean, require: true },
}
```

# Festa (struttura)

L'oggetto festa è così composto:

```javascript
{
  tipologia: { type: String,require: true },
  indirizzo: { type: String, require: true },
  numero_bambini: { type: Number, require: true },
  data: { type: Date, require: true },
  telefono: { type: String, require: true },
  ora_inizio: { type: String, require: true },
  ora_fine: { type: String, require: true },
  numero_animatori: { type: Number, require: true },
  prezzo: { type: Number, require: true },
  paga_animatore: { type: Number, require: true },
  informazione: { type: String },
  animatori_disponibili: { type: Array},
  animatori_scelti: { type: Array },
  terminata: { type: Boolean }
  }
```

# Utente (hooks);

| Scopo                                          | Tipo   | URL                           | return                                    |
| ---------------------------------------------- | ------ | ----------------------------- | ----------------------------------------- |
| creare un utente                               | post   | user/add                      | **(200)** l'oggetto utente                |
| cercare un utente specifico mendiante username | get    | user/:username                | **(200)** oggetto utente                  |
| cercare un utente specifico mediante id        | get    | user/:id                      | **(200)** oggetto utente                  |
| fare accesso                                   | post   | user/auth                     | **(200)** utente oggetto                  |
| cancellare utente                              | delete | user/delete/:id               | **(200)** string - utente eliminato       |
| aggiornare utente                              | put    | user/update/:id               | **(200)** string - utente aggiornato      |
| aggiungere disponibilità per una festa         | put    | user/setAvailable/:partyId    | **(200)** string - disponibilità aggiunta |
| rimuovere disponibilità per una festa          | put    | user/removeAvailable/:partyId | **(200)** string - disponibilità rimossa  |
| cercare tutte le feste in cui si viene scelti  | get    | user/myParties/:userId        | **(220)** array di oggetti festa          |

# Festa (hooks)

| Scopo                                          | Tipo   | URL                           | return                                |
| ---------------------------------------------- | ------ | ----------------------------- | ------------------------------------- |
| creare una festa                               | post   | party/add                     | **(200)** l'oggetto festa             |
| cercare una festa specifica mediante id        | get    | party/:id                     | **(200)** oggetto festa               |
| cercare tutte le feste                         | get    | party/                        | **(200)** array - festa               |
| cancellare festa                               | delete | party/delete/:id              | **(200)** string - festa eliminato    |
| aggiornare festa                               | put    | party/update/:id              | **(200)** string - festa aggiornato   |
| cercare tutti utenti disponibili per una festa | get    | party/available/:partyId      | **(200)** array - utente              |
| settare utenti scelti per una festa            | put    | party/setAnimatori/:partyId   | **(200)** string - Animatore inserito |
| rimuove utenti scelti                          | put    | party/removeAnimatori/:userId | **(220)** string - Animatore rimosso  |

# Tecnologie usate

- **Node.js**
  - express
  - mongoose
  - morgan
  - cors
  - helmet
  - bcrypt
- **MongoDB**
