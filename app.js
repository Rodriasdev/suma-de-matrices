import express from 'express'
import cors from 'cors'
import { Router } from 'express'

const app = express()
const PORT = 4000

const routes = Router()

routes.post('/sumar', (req,res) => {
    try {
        const {matriz1,matriz2} = req.body

        const resultado = []
    
        for (let i = 0; i < matriz1.length; i++) {
            resultado[i] = [];
            for (let j = 0; j < matriz1[0].length; j++) {
                resultado[i][j] = matriz1[i][j] + matriz2[i][j];
            }
        }
    
    
        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({
            msg: 'Error al sumar las matrices'
        })
    }

})

app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(routes)


app.listen(PORT, () => {
    console.log('server escuchando en el puerto '+PORT);
})