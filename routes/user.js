const express = require("express");
const bcrypt = require("bcrypt");
const {
  ObjectID
} = require("mongodb");
let User = require("../models/userModel");
let Party = require("../models/partyModel");

const app = express.Router();

//TODO: insert a user 

app.post("/add", async (req, res) => {

  try {

    const userData = req.body;
    const saltRound = 10;
    const plainPassword = userData.password;
    console.log(userData);

    userData.password = await bcrypt.hash(plainPassword, saltRound);

    const user = new User(userData);

    const result = await user.save();

    if (result)
      res.status(200).send(result);
    else throw {
      msg: "Utente non inserito"
    };
  } catch (error) {
    res.status(400).send(error);
  }

});

//TODO: retrieve a specific user by username

app.get("/:username", async (req, res) => {

  try {
    const {
      username
    } = req.params;

    const user = User.findOne({
      username: username
    });

    if (user)
      res.status(200).send(user);
    else throw {
      msg: "Utente non trovato"
    };

  } catch (error) {
    res.status(400).send(error);
  }

});

//TODO: retrieve a specific user by id

app.get("/:id", async (req, res) => {

  try {
    const {
      id
    } = req.params;

    const user = User.findOne({
      _id: new ObjectID(id),
    });

    if (user)
      res.status(200).send(user);
    else throw {
      msg: "Utente non trovato"
    };

  } catch (error) {
    res.status(400).send(error);
  }

});

//TODO: authentication

app.post("/auth", async (req, res) => {

  try {

    const {
      username,
      password
    } = req.body;

    const user = await User.findOne({
      username: username
    });

    if (user) {

      const isValid = await bcrypt.compare(password, user.password);

      if (isValid)
        res.status(200).send(user);
      else throw {
        msg: "Credenziali non valide"
      };

    } else throw {
      msg: "Utente non trovato"
    };
  } catch (error) {
    res.status(400).send(err);

  }

});

//TODO: delete a specfic user

app.delete("/delete/:id", async (req, res) => {

  try {
    const id = req.params.id;
    let objId = new ObjectID(id);
    const user = await User.findOne({
      _id: objId,
    });

    if (user) {

      const result = await User.deleteOne({
        _id: objId
      });

      if (result)
        res.status(200).send({
          msg: "Utente eliminato correttamente"
        });
      else throw {
        msg: "Utente non eliminato"
      };

    } else throw {
      msg: "Utente non trovato"
    };

  } catch (error) {
    res.status(400).send(err);
  }

});

//TODO: update a user 

app.put("/update/:id", async (req, res) => {

  try {

    const updatedUser = req.body;
    const id = req.params.id;
    let objId = new ObjectID(id);
    let saltRound = 10;
    updatedUser.password = await bcrypt.hash(updatedUser.password, saltRound);
    const user = await User.findOne({
      _id: objId,
    });

    if (user) {

      const update = await User.updateOne({
        _id: user._id
      });

      if (update)
        res.status(200).send({
          msg: "Utente correttamente aggiornato"
        });
      else throw {
        msg: "Utente non aggiornato"
      };

    } else throw {
      msg: "Utente non trovato"
    };


  } catch (error) {
    res.status(400).send(error);
  }

});

//TODO: set availability

app.put("/setAvailable/:partyId", async (req, res) => {

  try {

    const {
      partyId
    } = req.params;
    const {
      userId
    } = req.body;

    const party = await Party.findOne({
      _id: new ObjectID(partyId),
    });

    if (party) {

      const user = await User.findOne({
        _id: new ObjectID(userId)
      });

      if (user) {
        const arr = [...party.animatori_disponibili];
        let isIn = false;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == userId) {
            isIn = true;
            break;
          }
        }

        if (!isIn) {
          party.animatori_disponibili.push(user._id);

          const result = await User.updateOne({
            _id: party._id
          });

          if (result)
            res.status(200).send({
              msg: "Disponibilità aggiunta"
            });
          else throw {
            msg: "Disponibilità non aggiunta"
          };
        }

      } else throw {
        msg: "Utente non trovato"
      };

    } else throw {
      msg: "Festa non trovata"
    };

  } catch (error) {
    res.status(200).send(error);

  }

});


//TODO: remove availability

app.put("/removeAvailable/:partyId", async (req, res) => {

  try {

    const {
      partyId
    } = req.params;
    const {
      userId
    } = req.body;

    const party = await Party.findOne({
      _id: new ObjectID(partyId),
    });

    if (party) {

      const user = await User.findOne({
        _id: new ObjectID(userId)
      });

      if (user) {
        const arr = [...party.animatori_disponibili];
        let isIn = false;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == userId) {
            isIn = true;
            break;
          }
        }

        if (isIn) {
          party.animatori_disponibili.splicee(pos, 1);

          const result = await User.updateOne({
            _id: party._id
          });

          if (result)
            res.status(200).send({
              msg: "Disponibilità rimossa"
            });
          else throw {
            msg: "Aggiornamento non effettuato"
          };
        }

      } else throw {
        msg: "Utente non trovato"
      };

    } else throw {
      msg: "Festa non trovata"
    };

  } catch (error) {
    res.status(400).send(error);

  }

});


//TODO: get all parties by user

app.get("/myParties/:userId", async (req, res) => {

  try {

    const {
      userId
    } = req.params;

    const user = await User.findOne({
      _id: new ObjectID(userId)
    });

    if (user) {

      const parties = await Party.find({
        animatori_scelti: new Object(user._id)
      }, "_id");

      if (parties)
        res.status(200).send(parties);
      else throw {
        msg: "Nessuna festa trovata"
      };

    } else throw {
      msg: "Utente non trovato"
    };


  } catch (error) {
    res.status(400).send(error);

  }

});
module.exports = app;