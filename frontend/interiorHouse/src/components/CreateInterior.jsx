import React, {useState, useEffect} from 'react';

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { DoubleSide, MathUtils } from "three";

import ElementList from './createInteriorComponents/ElementList'

import '../static/styles/createInterior/createInterior.css';

const CreateInterior = function ({client}) {
    const [elements,setElements] = useState([])

    useEffect(() => {
        fetchElements()
        // eslint-disable-next-line
    }, [])

    async function fetchElements() {
        const response = await client.get("/elements")
        setElements(response.data)
    }

	return(
		<div className="createInterior">
            <Canvas style={{height: `100%`, position: `absolute`, top:`0`, zIndex:`-1` }}>
                <GreenSquare />
                <ambientLight />
                <PerspectiveCamera position={[2, 2, 2]} makeDefault />
                <OrbitControls />
            </ Canvas>
            <ElementList elements={elements} />
        </div>
	)
}

function GreenSquare() {
  return (
    <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, MathUtils.degToRad(45)]} scale={[5, 5, 5]}>
      <planeBufferGeometry />
      <meshBasicMaterial color="green" side={DoubleSide} />
    </mesh>
  );
}

export default CreateInterior;