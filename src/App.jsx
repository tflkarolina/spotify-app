import { list } from 'postcss';
import { useEffect, useState, useRef } from 'react';

const API = '/assets/api.json';

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(0);
  const audioRef = useRef();


  useEffect(() => {
    fetch(API).then(response => {
      if (response.ok) {
        response.json().then(response => setSongs(response));
      }
      throw new Error('Network response was not ok.');
    })
  }, []);

  useEffect(() => {
    if(audioRef.current) {
      audioRef.current.src = songs[selectedSong].audio;
      audioRef.current.play();
    }
  
  }, [selectedSong, songs])



  if (songs.length<1) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white justify-center items-center flex-col m-auto'>
      <section className='bg-black p-8 text-center'>
        <h1 className='text-3xl font-bold mb-4'>spotify</h1>
        <img className='mx-auto my-4 w-64 object-cover shadow-lg rounded-lg' src={songs[selectedSong].cover} />
        <button className='bg-green-500 hover:bg-green-700 py-2 px-6 mr-2 rounded-full' onClick={() => audioRef.current.play()}>Play</button>
        <button className='bg-green-500 hover:bg-green-700 py-2 px-6 mr-2 rounded-full' onClick={() => audioRef.current.pause()}>Pause</button>
        <audio ref={audioRef} src={songs[selectedSong].audio}></audio>
      </section>
      <section>
        <h1 className='text-2xl font-bold mb-4 text-center'>
          Songs:
        </h1>
        <ul className='flex flex-col space-y-2 items-center'>
          {songs.map((song, index)=> (<li className={`text-center py-2 px-6 cursor-pointer rounded-lg ${songs[selectedSong].id===song.id ? 'bg-gray-700' : 'bg-gray-800'}`} style={{width: '250px'}} key={song.id} onClick={() => setSelectedSong(index)}>
            {song.title} by {song.author}
          </li>))}              
        </ul>
      </section>
    </div>
  )
}

export default App
