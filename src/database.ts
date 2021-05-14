import * as fs from "fs-extra"
import * as os from "os"
import * as path from "path"

export interface DatabaseModel {
    media: MediaModel[]
}

export interface MediaModel {
    id: string,
    path: string,
    aliases: string[],
    tags: string[],
    lastPlayedTime: Date,
    totalPlayCount: number
}

export interface AudioModel extends MediaModel {
    volume: number
}

const DATABASE_PATH = path.join(os.homedir(), ".streamerfriendly/database.json")

export class Database {
    model: DatabaseModel

    constructor() {
        fs.pathExists(DATABASE_PATH)
        .then((exists) => {
            if (!exists) {
                const output: DatabaseModel = {media: []}
                return fs.outputJSON(DATABASE_PATH, output)
            }
        })
        .then(() => {
            return fs.readJson(DATABASE_PATH)
        })
        .then((parsedJson) => {
            this.model = parsedJson
        })
        .catch((err) => {
            console.error(err)
        })
    }
}