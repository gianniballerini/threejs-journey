import { Clock } from 'three'
import { App } from './App'


const app = new App()
app.init()

window.addEventListener('resize', app.resize.bind(app))

const clock = new Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    app.update(elapsedTime)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
