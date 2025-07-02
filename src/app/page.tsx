'use client'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

const wordList = ['cat', 'dog', 'fish', 'lion', 'tiger', 'elephant', 'giraffe', 'zebra'];
const guessWord = wordList[Math.floor(Math.random() * wordList.length)]


const Hangman = () => {
    const keyboard = [
        ['A', 'B', 'C', 'D', 'E'],
        ['F', 'G', 'H', 'I', 'J'],
        ['K', 'L', 'M', 'N', 'O'],
        ['P', 'Q', 'R', 'S', 'T'],
        ['U', 'V', 'W', 'X', 'Y'],
        ['Z']
    ];

    const [step, setStep] = useState(1)
    const [guesssedword, setGuessedWord] = useState([])
    const mainWord = guessWord.toUpperCase()

    const handleGuess = (val) => {
        const isIncluded = (mainWord.split('')).includes(val)
        if (!isIncluded) {
            setStep(step + 1)
        }

        if (isIncluded) {
            setGuessedWord([...guesssedword, val])
        }
    }

    return (
        <div className='m-5 bg-gray-200 w-screen h-screen'>
          <div className='m-2 p-2 border border-black rounded-[20px] w-max'>
            <span className='text-4xl font-bold'>Hangman</span><br /><br />
            <span className='italic m-4 '>Theme: Animals</span>
            </div>

            {step == 7 && (
                <div className='bg-black w-50 m-2 p-2'>
                    <span className='text-white'>YOU LOST THE GAME!!! <span className='font-bold m-3'>The word was {mainWord}</span></span>
                </div>)}
            <div className='items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'>
                 <div className='border border-black rounded-[25px] p-2 m-3 bg-purple-200 w-max '>
                <img src={`/hang_${step}.gif`} alt="Default" className='m-3' />

                {JSON.stringify(guesssedword) === JSON.stringify(mainWord.split('')) && //JSON.stringify converts array into string as direct array comparision was not possible here
                    (<div className='bg-black w-100 m-2 p-2'>
                        <span className='text-white'>CONGRATULATIONS!!! YOU GUESSED THE WORD CORRECTLY.</span>
                    </div>)}

               
                    {mainWord.split('').map((item, idx) => {
                        return (<span className='m-2' key={idx}>
                            {guesssedword.includes(item) ? item : '___'} </span>)
                    })}
                </div>

                <div className='border border-black m-2 p-2 rounded-[25px] bg-red-200 w-80'>
                    {step < 7 && !(JSON.stringify(guesssedword) === JSON.stringify(mainWord.split(''))) && keyboard.map((items, id) => {
                        return (<div className='flex m-2' key={id}>
                            {items.map((itm, idx) => {
                                return (<div key={idx}>
                                    <Button className='m-2' onClick={() => handleGuess(itm)}>{itm}</Button>
                                </div>)
                            })}
                        </div>)
                    })}
                </div>
            </div>

            <div className='bg-green-200 absolute bottom-0 w-screen font-bold text-center p-1'>
                Created By Abhiyan Paudel
            </div>
        </div>

    )
}

export default Hangman