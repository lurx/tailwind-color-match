import './App.css';
import { useEffect, useState } from "react";
// import { exported } from "./data/tailwindColors";
import colors from 'tailwindcss/colors';

const App = () => {
    const [ userColor, setUserColor ] = useState( '#fff1f2' );
    // const [ userColor, setUserColor ] = useState( '#0000ff' );
    const [ outputClass, setOutputClass ] = useState( 'bg-rose-50' );

    useEffect( () => {
        // setUserColor( '#000000');
        // console.log(colors);
        const hexValidity = isValidHex( userColor );
        if (hexValidity[0] === true) {
            console.log( isValidHex( userColor ) )
        }

        let currentColor = '',
            classString = '';

        Object.entries( colors ).map( ([ key, value ], index) => {
            currentColor = key;
            if (value === userColor) {
                classString = `bg-${currentColor}`;
                return classString;
            } else {
                Object.entries( value ).map( ([ k, v ], index) => {
                    if (v === userColor) {
                        classString = `bg-${currentColor}-${k}`
                        console.log( 'string: ', classString );
                        return classString;
                    }
                } )
            }

            setOutputClass( classString );
        } );

        // console.log( x, y );


    }, [ userColor ] );

    // useEffect( () => {
    //     if (isValidHex( userColor )) {
    //         setOutputClass( closestHexFromRgb( hexToRgb( userColor ) ) );
    //     }
    // }, [userColor] )

    const isValidHex = (color) => {
        let result,
            hexLength = color.length;
        if (!color || typeof color !== 'string') return false;

        // Validate hex values
        if (color.substring( 0, 1 ) === '#') color = color.substring( 1 );
        // add # to hex if missing
        if (userColor.charAt(0) !== '#') { setUserColor('#'+userColor) }

        switch (hexLength) {
            case 3:
                result = /^[0-9A-F]{3}$/i.test( color );
                break;
            case 6:
                result = /^[0-9A-F]{6}$/i.test( color );
                break;
            case 8:
                result = /^[0-9A-F]{8}$/i.test( color );
                break;
            default:
                result = false;
                break;
        }

        let res = [ result, hexLength ]
        console.log( res );
        return res;
    }

    /*const hexToRgb = (hex) => {
        const shortRegEx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace( shortRegEx, function (full, r, g, b) {
            return [ r, r, g, g, b, b ].join();
        } );

        const longRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?/i;
        const rgbArray = longRegEx.exec( hex );
        return rgbArray ? {
            r: parseInt( rgbArray[1], 16 ),
            g: parseInt( rgbArray[2], 16 ),
            b: parseInt( rgbArray[3], 16 )
        } : null;
    }*/

    /*const closestHexFromRgb = (rgbObj) => {
        if (!rgbObj) {
            return false;
        }

        let minDistance = Number.MAX_SAFE_INTEGER;
        let nearestHex = null;

        for (let i = 0; i < tailwindColors.length; i++) {
            let currentColor = tailwindColors[i];
            let distance = Math.sqrt(
                Math.pow( ( rgbObj.r - currentColor.rgb.r ), 2 ) +
                Math.pow( ( rgbObj.g - currentColor.rgb.g ), 2 ) +
                Math.pow( ( rgbObj.b - currentColor.rgb.b ), 2 )
            );
            if (distance < minDistance) {
                minDistance = distance;
                nearestHex = currentColor.hex;
            }
        }

        return tailwindColors.find( element => element.hex === nearestHex ).name;
    }*/

    return (
        <div className="w-full h-screen grid grid-cols-2">
            <div
                className={`flex flex-col justify-center items-center p-4 transition transition-500`}
                style={{ backgroundColor: userColor }}
            >
                <div className="p-20 rounded-xl w-1/2 text-blue-50 backdrop">
                    <p className="mb-2 text-xl">Input your color.</p>
                    <input
                        id="rotem"
                        type="text"
                        className={`w-full mb-2 text-4xl text-center backdrop`}
                        value={userColor}
                        onChange={(e) => {
                            setUserColor( e.target.value )
                        }}
                        onClick={(e) => {
                            e.target.value = '';
                        }}
                    />
                    <div className="flex justify-end">
                        <div className="footnote text-xs">(6 Character HEX code)</div>
                    </div>
                </div>
            </div>
            <div className={`flex items-center justify-center ${outputClass}`}>
                <div className="backdrop py-2 px-4 inner-shadow rounded-md text-gray-500 font-mono leading-10 text-2xl">
                    {'<'}MyComponent <span className="italic text-white">className="<span
                    className="text-yellow-300">{outputClass}</span>"</span>{' />'}
                </div>

            </div>
        </div>
    );
}

export default App;
