import {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const countTotal = (num) => {
    console.log("Counting...")
    return num + 10;
}
const SliderTwo = (props) => {
    const [state, setState] = useState({slide: 0, autoplay: false})
    const [text, setText] = useState("")
    const myRef = useRef(1);

    useEffect(() => {
        console.log(myRef.current.value)
        console.log("text", text)
    })


    const style = useMemo(() => ({
        color: state.slide > 4 ? 'red' : "blue"
    }), [state.slide]);

    const total = useMemo(() => {
        return countTotal(state.slide)
    }, [state.slide])

    const getSomeImages = useCallback(() => {
        console.log('fetching')
        return [
            "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
            "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"

        ]
    }, [state.slide])

    useEffect(() => {
        console.log('bitch, you better be joking')
    }, [style])

    useEffect(() => {
        console.log("hello")
        document.title = `Slide: ${state.autoplay}`

        window.addEventListener('click', logging)

        return () => {
            window.removeEventListener('click', logging)
        }
    }, [state.autoplay])

    function logging() {
        console.log('log!')
    }

    function changeSlide(i) {
        setState(state => ({...state, slide: state.slide + i}))
    }

    function toggleAutoplay() {
        setState(state => ({...state, autoplay: !state.autoplay}))
    }


    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100"
                     src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                     alt="slide"/>


                <Slide getSomeImages={getSomeImages}/>
                <div className="text-center mt-5">Active slide {state.slide} <br/> {state.autoplay ? 'auto' : null}
                </div>
                <div style={style} className="text-center mt-5">Total slides: {total}
                </div>
                <div className="buttons mt-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}
                    >-1
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}
                    >+1
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}
                    >toggle autoplay
                    </button>
                </div>
                <div className="buttons mt-3">
                    <label htmlFor="exampleFormControl" className="form-label">Email Address</label>
                    <input onChange={(e) => setText(e.target.value)} ref={myRef} type="email" className="form-control" id="exampleFormControl"/>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState()

    useEffect(() => {
        setImages(getSomeImages())
    }, [])

    return (
        <>
            {images && images.map((url, i) => {
                return <img key={i} className="d-block w-100" src={url} alt="slide"/>
            })}
        </>
    )
}

function App() {
    return (
        <SliderTwo/>
    );
}

export default App;
