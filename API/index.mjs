import express from "express"
import cors from "cors"
import "express-async-errors"

// Load environment variables
import "./loadEnvironment.mjs";
import teams from "./routes/teams.mjs"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/teams", teams);

app.use((err, _req, res, next) => {
    res.status(500).send("Unexpected error occured. Code 500")
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});