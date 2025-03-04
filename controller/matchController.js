const Match = require('../models/matchModel');

exports.createMatch = async (req, res) => {
  try {
      const { matchName, playerName, score } = req.body;
      let match = await Match.findOne({ matchName });

      if (match) {
          // Check if player already exists in the match
          if (!match.players.some(player => player.playername === playerName)) {
              match.players.push({ playername: playerName, score: score || "0" });
              await match.save();
          }
          return res.status(200).json(match);
      } else {
          const newMatch = new Match({ matchName, players: [{ playername: playerName, score: score || "0" }] });
          await newMatch.save();
          return res.status(201).json(newMatch);
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMatchByMatchName = async (req, res) => {
  try {
    const { matchName } = req.params;
    const match = await Match.findOne({ matchName: matchName });
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMatch = async (req, res) => {
  try {
      const { playerIndex, playerName, score, matchName } = req.body;
      const match = await Match.findById(req.params.id);
      if (!match) return res.status(404).json({ message: 'Match not found' });
      
      if (playerIndex < 0 || playerIndex >= match.players.length) {
          return res.status(400).json({ message: 'Invalid player index' });
      }
      
      match.players[playerIndex] = { playername: playerName, score: score || match.players[playerIndex].score };
      match.matchName = matchName || match.matchName;
      await match.save();
      res.status(200).json(match);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const deletedMatch = await Match.findByIdAndDelete(req.params.id);
    if (!deletedMatch) return res.status(404).json({ message: 'Match not found' });
    res.status(200).json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};