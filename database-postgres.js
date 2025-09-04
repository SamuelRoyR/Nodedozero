import { randomUUID } from "node:crypto"
import {pool} from './db.js'

export class DatabasePostgres {
   async list(search ){
    let videos

    if(search){
        videos = await pool.query(`SELECT * FROM videos WHERE title ILIKE $1`, ['%' + search + '%'])
    }else{
        videos = await pool.query(`SELECT * FROM videos`)
    }
    return videos
    }
    
    async create(video){
      const videoId = randomUUID()

      const {title, description, duration} = video

      await pool.query(`INSERT INTO videos (id, title, description, duration) VALUES ($1, $2, $3, $4)`, [videoId, title, description, duration])
    }
    
    async update(id, video){
        const {title, description, duration} = video

        await pool.query(`UPDATE videos SET title = $1, description = $2, duration = $3 WHERE id = $4`, [title, description, duration, id])
    }
    async delete(id){
        await pool.query(`DELETE FROM videos WHERE id = $1`, [id])
    }
}