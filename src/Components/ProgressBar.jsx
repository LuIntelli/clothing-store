import React from 'react'
import useStorage from '../Hooks/UseStorage';

const ProgressBar = ({ file, setFile, docId }) => {
    const { url, progress } = useStorage(file);
    console.log(url, progress);
    return (


    <div className='progress-bar bg-red-400 h-6 rounded-full' style={{ width: `${progress} + %`}}>
    </div>
  )
}

export default ProgressBar