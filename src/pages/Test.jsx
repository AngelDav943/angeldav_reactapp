import './test.css'

export default function () {
    return <main className="test">
        <section className='item'>
            <img src="/images/drawn_computer.png" alt="computer" />
        </section>

        <section className='item' style={{height:"200px"}}>
            <img src="/images/turret_drawing.png" alt="turret sideways" />
            <img src="/images/turret_drawing_front.png" alt="turret front" />
        </section>

    </main>
}