import {useState, useEffect, useCallback} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const SliderTwo = (props) => {
    const [state, setState] = useState({slide: 0, autoplay: false})
    const getSomeImages = useCallback(() => {
        console.log('fetching')
        return [
            "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
            "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"

        ]
    }, [state.slide])

    function logging() {
        console.log('log!')
    }

    useEffect(() => {
        console.log("hello")
        document.title = `Slide: ${state.autoplay}`

        window.addEventListener('click', logging)

        return () => {
            window.removeEventListener('click', logging)
        }
    }, [state.autoplay])

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
                {/*{*/}
                {/*    getSomeImages().map((url, i) => {*/}
                {/*        return (*/}
                {/*            <img key={i} className="d-block w-100" src={url} alt="slide"/>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}

                <Slide getSomeImages={getSomeImages}/>
                <div className="text-center mt-5">Active slide {state.slide} <br/> {state.autoplay ? 'auto' : null}
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
