import React, {useState, useEffect } from 'react';

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { DoubleSide, MathUtils, Raycaster, Vector2 } from "three";

import ElementList from './createInteriorComponents/ElementList'

import '../static/styles/createInterior/createInterior.css';

const CreateInterior = function ({client}) {
    const [elements,setElements] = useState([])

    const [scene,setScene] = useState(false)
    const [camera,setCamera] = useState(false)

    const [createObject,setcreateObject] = useState({create:false,object:null})

    useEffect(() => {
        fetchElements()
        // eslint-disable-next-line
    }, [])

    async function fetchElements() {
        const response = await client.get("/elements")
        setElements(response.data)
    }

    function canvasOnClick(event){
        setcreateObject({create:false,object:null})

        const raycaster = new Raycaster();
        const pointer = new Vector2();

        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
        raycaster.setFromCamera( pointer, camera );

        const intersects = raycaster.intersectObjects(scene.children);
        
        for ( let i = 0; i < intersects.length; i ++ ) {
            console.log(intersects[i])
            // ToDo oncklick object move him
        }

        if (createObject.create){
            createObject.object.position.set(intersects[0].point.x,intersects[0].point.y,intersects[0].point.z)
            scene.add(createObject.object)
        }
    }

    function onCreatedCanvas(state){
        setScene(state.scene)
        setCamera(state.camera)
    }

	return(
		<div className="createInterior">
            <Canvas onCreated={onCreatedCanvas} onClick={canvasOnClick} style={{background:`white`, height: `100%`, position: `absolute`, top:`0`, zIndex:`-1` }}>
                <Square />
                <ambientLight />
                <PerspectiveCamera position={[0, 10, 10]} makeDefault />
                <OrbitControls />
            </ Canvas>
            <ElementList setcreateObject={setcreateObject} elements={elements} />
        </div>
	)
}

function Square() {
  return (
    <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[20, 20, 20]}>
      <planeGeometry />
      <meshBasicMaterial color="gray" side={DoubleSide} />
    </mesh>
  );
}

export default CreateInterior;