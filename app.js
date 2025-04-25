
const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const cors = require('cors')
const {v4: uuidv4} = require('uuid')

const app = express()
app.use(express.json())
app.use(cors({origin: '*'}))

// Use a persistent path for the database file
const databasePath = path.resolve(__dirname, 'contact.db')
console.log('Using DB at:', databasePath)

let database = null

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })

    // Enable Write-Ahead Logging to improve persistence
    await database.run('PRAGMA journal_mode = WAL;')

    // Create table if it doesn't exist
    await database.run(`
      CREATE TABLE IF NOT EXISTS contacts (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT,
        contact TEXT
      )
    `)

    app.listen(3000, () =>
      console.log('Server Running at http://localhost:3000/'),
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

// GET all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await database.all('SELECT * FROM contacts')
    res.status(200).send(contacts)
  } catch (err) {
    res.status(500).send({error: err.message})
  }
})

// GET contact by ID
app.get('/contacts/:id', async (req, res) => {
  const {id} = req.params
  try {
    const contact = await database.get('SELECT * FROM contacts WHERE id = ?', [
      id,
    ])
    res.status(200).send(contact)
  } catch (err) {
    res.status(500).send({error: err.message})
  }
})

// POST new contact
app.post('/contacts', async (req, res) => {
  const {name, email, contact} = req.body
  const id = uuidv4()
  try {
    await database.run(
      'INSERT INTO contacts (id, name, email, contact) VALUES (?, ?, ?, ?)',
      [id, name, email, contact],
    )
    console.log('Inserted contact:', {id, name, email, contact})
    res.status(201).send('Contact Created Successfully')
  } catch (err) {
    res.status(500).send({error: err.message})
  }
})

// PUT update contact
app.put('/contacts/:id', async (req, res) => {
  const {id} = req.params
  const {name, email, contact} = req.body
  try {
    await database.run(
      'UPDATE contacts SET name = ?, email = ?, contact = ? WHERE id = ?',
      [name, email, contact, id],
    )
    res.status(200).send('Contact Updated Successfully')
  } catch (err) {
    res.status(500).send({error: err.message})
  }
})

// DELETE contact
app.delete('/contacts/:id', async (req, res) => {
  const {id} = req.params
  try {
    await database.run('DELETE FROM contacts WHERE id = ?', [id])
    res.status(200).send('Contact Deleted Successfully')
  } catch (err) {
    res.status(500).send({error: err.message})
  }
})

module.exports = app
