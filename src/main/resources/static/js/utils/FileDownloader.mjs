import https from "https"
import fs from "fs"

async function download(url, dest) {
	try {
		const promise = new Promise((resolve, reject) => {
			const file = fs.createWriteStream(dest, { flags: "wx" })
			const request = https.get(url, response => {
				if (response.statusCode === 200) {
					response.pipe(file)
				} else {
					file.close()
					fs.unlink(dest, () => {}) // Delete temp file
					reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`)
				}
			})

			request.on("error", err => {
				file.close()
				fs.unlink(dest, () => {}) // Delete temp file
				reject(err.message)
			})

			file.on("finish", () => {
				resolve()
			})

			file.on("error", err => {
				file.close()

				if (err.code === "EEXIST") {
					reject("File already exists")
				} else {
					fs.unlink(dest, () => {}) // Delete temp file
					reject(err.message)
				}
			})
		})

		await promise
	} catch (err) {
		throw err
	}
}

export { download }
