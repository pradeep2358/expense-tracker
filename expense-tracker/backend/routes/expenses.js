const router = require("express").Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

router.use(auth); // all routes protected

router.post("/", async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    if (!title || !amount || !category) {
      return res.status(400).json({ message: "Title, amount and category required" });
    }
    const expense = await Expense.create({ ...req.body, user: req.user.id });
    res.status(201).json(expense);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get("/", async (req, res) => {
  try {
    res.json(await Expense.find({ user: req.user.id }).sort({ date: -1 }));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user.id });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json(expense);
  } catch (err) { res.status(400).json({ message: "Invalid ID" }); }
});

router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, req.body, { new: true });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json(expense);
  } catch (err) { res.status(400).json({ message: "Invalid ID" }); }
});

router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) { res.status(400).json({ message: "Invalid ID" }); }
});

module.exports = router;
