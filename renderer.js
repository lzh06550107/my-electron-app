const setButton = document.getElementById('btn1')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
})

const btn = document.getElementById('btn2')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile()
    filePathElement.innerText = filePath
})

const func = async () => {
    const response = await window.electronAPI.ping()
    console.log(response) // 打印 'pong'
}

func()
