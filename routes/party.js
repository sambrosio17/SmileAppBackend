const express = require("express");
let Party = require("../models/partyModel");
const {
  ObjectID
} = require("mongodb");
const User = require("../models/userModel");

const app = express.Router();

//create
/* app.post("/add", (req, res) => {
  const partyData = req.body;
  console.log(partyData);

  const party = new Party(partyData);
  party
    .save()
    .then((result) => res.send(result))
    .catch((err) =>
      res.status(400).json({
        error: err,
      })
    );
}); */

//TODO: aggiunge una nuova festa
app.post("/add", async (req, res) => {
  try {
    const partyData = req.body;
    const party = new Party(partyData);

    const result = await party.save();
    if (result) {
      res.status(200);
      res.send(result);
    } else
      throw {
        msg: "Festa non aggiunta!",
      };
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

//aggiusta gli errori manda status code

/* //get a specific party
app.get("/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const party = await Party.findOne({
      _id: new ObjectID(id)
    });

    if (party) res.send(party);
    else throw "Festa non trovata";
  } catch (error) {
    res.send(error);
  }
}); */

//TODO: get a specific party
app.get("/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const party = await Party.findOne({
      _id: new ObjectID(id),
    });
    if (party) {
      res.status(200);
      res.send(party);
    } else
      throw {
        msg: "Festa non trovata!",
      };
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

/* //get all parties
app.get("/", async (req, res) => {
  try {
    const parties = await Party.find();

    if (parties) res.send(parties);
    else throw "Nessuna festa trovata";
  } catch (error) {
    res.send(error);
  }
}); */

//TODO: get all parties

app.get("/", async (req, res) => {
  try {
    const parties = await Party.find();
    if (parties) {
      res.status(200);
      res.send(parties);
    } else
      throw {
        msg: "Nessuna festa trovata",
      };
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

/* //delete a party
app.delete("/delete/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const party = await Party.findOne({
      _id: new ObjectID(id)
    });

    if (party) {
      await Party.deleteOne({
        _id: new ObjectID(party._id)
      });
      res.send("Festa eliminata");
    } else throw "Festa non trovata";
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}); */

//TODO: delete a specific party

app.delete("/delete/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const party = await Party.findOne({
      _id: new ObjectID(id)
    });
    if (party) {
      await Party.deleteOne({
        _id: new ObjectID(party._id)
      });
      res.status(200);
    } else throw {
      msg: "Festa non trovata"
    };
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

/* //update a party
app.put("/update/:id", async (req, res) => {
  try {
    const updatedParty = req.body;
    const { id } = req.params;

    const party = await Party.findOne({
      _id: new ObjectID(id),
    });
    if (party) {
      const update = await Party.updateOne(
        {
          _id: party._id,
        },
        updatedParty
      );
      if (update) {
        res.status(200).send(update);
      } else {
        res.status(400);
        throw {
          codice: 400,
          msg: "Aggiornamento non eseguito",
        };
      }
    } else {
      res.status(400);
      throw {
        codice: 400,
        msg: "Festa  non trovata",
      };
    }
  } catch (error) {
    res.send(error);
  }
}); */

//TODO: update a party

app.put("/update/:id", async (req, res) => {
  try {
    const updatedParty = req.body;
    const {
      id
    } = req.params;

    const party = await Party.findOne({
      _id: new ObjectID(id)
    });

    if (party) {
      const update = await Party.updateOne({
        _id: party.id
      }, updatedParty);
      if (update) res.status(200).send({
        msg: "Festa aggiornata"
      });
      else throw {
        msg: "Aggiornamento non eseguito"
      };
    } else throw {
      msg: "Festa non trovata"
    };
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

/* app.get("/available/:partyId", async (req, res) => {
  try {
    const { partyId } = req.params;
    const party = await Party.findOne({
      _id: new ObjectID(partyId),
    });
    if (party) {
      res.send(party.animatori_disponibili);
    } else {
      throw "Festa non trovata";
    }
  } catch (error) {
    res.send(error);
  }
}); */

//TODO: get all available user for a specific party

app.get("/available/:partyId", async (req, res) => {
  try {
    const {
      partyId
    } = req.params;
    const party = await Party.findOne({
      _id: new ObjectID(partyId),
    });

    if (party) {
      res.status(200).send(party.animatori_disponibili);
    } else throw {
      msg: "Festa non trovata"
    };
  } catch (error) {
    res.status(400).send(error);
  }
});

const check = (arr, value) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == value) return true;
  }
  return false;
};

/* app.put("/setAnimatori/:partyId", async (req, res) => {
  try {
    const { partyId } = req.params;

    const { scelti } = req.body;
    if (scelti == null) throw "Body della richiesta non formattato bene";

    const party = await Party.findOne({
      _id: new ObjectID(partyId),
    });

    if (party) {
      const arr = [...party.animatori_disponibili];
      for (item of arr) {
        if (check(scelti, item)) party.animatori_scelti.push(item);
      }
      Party.updateOne(
        {
          _id: party._id,
        },
        party
      )
        .then((updatedParty) => {
          if (updatedParty) res.send(updatedParty);
          else throw "Disponibilità non aggiunta";
        })
        .catch((error) => res.send(error));
    } else throw "Festa non trovata";
  } catch (error) {
    res.send(error);
  }
}); */

//TODO: set user for a party

app.put("/setAnimatori/:partyId", async (req, res) => {
  try {
    const {
      partyId
    } = req.params;

    const {
      scelti
    } = req.body;
    if (scelti == null)
      throw {
        msg: "Body della richiesta non formattato bene"
      };

    const party = await Party.findOne({
      _id: new ObjectID(partyId)
    });

    if (party) {
      const arr = [...party.animatori_disponibili];
      for (item of arr) {
        if (check(scelti, item)) party.animatori_disponibili.push(item);
      }

      const update = await Party.updateOne({
        _id: party._id
      });

      if (update) {
        res.status(200).send({
          msg: "Animatore inserito"
        });
      } else throw {
        msg: "Aggiornamento non effettuato"
      };
    } else throw {
      msg: "Festa non trovata"
    };
  } catch (error) {
    res.status(400).send(error);
  }
});

/* app.put("/removeAnimatori/:partyId", async (req, res) => {
  try {
    const { partyId } = req.params;

    const { scelti } = req.body;

    if (scelti == null) throw "Body della richiesta non formattato bene";

    const party = await Party.findOne({
      _id: new ObjectID(partyId),
    });

    if (party) {
      const arr = [...party.animatori_scelti];
      for (item of arr) {
        if (check(scelti, item)) {
          party.animatori_scelti.splice(arr.indexOf(item), 1);
        }
      }
      Party.updateOne(
        {
          _id: party._id,
        },
        party
      )
        .then((updatedParty) => {
          if (updatedParty) res.send(updatedParty);
          else throw "Disponibilità non aggiunta";
        })
        .catch((error) => res.send(error));
    } else throw "Festa non trovata";
  } catch (error) {
    res.send(error);
  }
}); */

//TODO: remove user for a party

app.put("/removeAnimatori/:partyId", async (req, res) => {
  try {
    const {
      partyId
    } = req.params;

    const {
      scelti
    } = req.body;
    if (scelti == null)
      throw {
        msg: "Body della richiesta non formattato bene"
      };

    const party = await Party.findOne({
      _id: new ObjectID(partyId)
    });

    if (party) {
      const arr = [...party.animatori_disponibili];
      for (item of arr) {
        if (check(scelti, item))
          party.animatori_disponibili.splice(arr.indexOf(item), 1);
      }

      const update = await Party.updateOne({
        _id: party._id
      });

      if (update) {
        res.status(200).send({
          msg: "Animatore rimosso"
        });
      } else throw {
        msg: "Aggiornamento non effettuato"
      };
    } else throw {
      msg: "Festa non trovata"
    };
  } catch (error) {
    res.status(400).send(error);
  }
});

//devi testare

module.exports = app;