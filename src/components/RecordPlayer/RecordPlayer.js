import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import styles from './RecordPlayer.styles'
import useRecordPlayer from './RecordPlayer.hook'
import Record from './static/record.png'
import { string } from 'prop-types'
import Sound from 'react-sound'
import styled, { keyframes } from 'styled-components'
import soundfile from './static/clarkSisters-livingInVain.mp3'
const useStyles = makeStyles(styles)
/**
 * renders the spinning record component
 * has album artwork in the middle
 */

function RecordPlayer({song, spinning=false}) {
  const { spinRecord, stopRecord } = useRecordPlayer();
  const { direction, speed } = useSelector(({recordPlayer})=>{
    return recordPlayer
  })
  const playmusic = (direction, speed) => {
    spinRecord('CLOCKWISE', .5)
  }
  const { item,   tray, root, record } = useStyles()
  const rotateRecord = (direction,speed) =>{
    const sign = direction === 'CLOCKWISE' ? '+' : '-'
    return keyframes`
    from {
      transform: rotate(0deg);
    }
  
    to {
      transform: rotate(${sign}${speed*4000*360}deg);
    }`
  }
  const Rotate = styled.div`
  animation: ${rotateRecord(direction,speed)} 400s ease-in-out infinite;
  font-size: 1.2rem;
`;

  return (
    <div className={tray}>
      {(direction === 'CLOCKWISE' || direction === 'COUNTERCLOCKWISE') && <div className={item} >
        <Rotate className={root}>
          <img className={record} alt='record' onClick={()=> stopRecord()} src={Record} />
        </Rotate>
        <Sound playStatus={Sound.status.PLAYING} playbackRate={speed} url={soundfile}/>
      </div>}
      
      {direction === null && <div className={item} >
        <div className={root}>
          <img className={record} alt='record' onClick={(e)=> playmusic()} src={Record} />
        </div>
      </div>}
      
    </div>
    
  )
}

RecordPlayer.propTypes = {
  song: string,
}

export default RecordPlayer
