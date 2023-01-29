import React, {useState, useEffect } from 'react';

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { DoubleSide, Raycaster, Vector2, GridHelper } from "three";

import ElementList from './createInteriorComponents/ElementList'

import '../static/styles/createInterior/createInterior.css';

const CreateInterior = function ({client}) {
    const [showElements,setShowElements] = useState("none")
    const [elements,setElements] = useState([])

    const [scene,setScene] = useState(false)
    const [camera,setCamera] = useState(false)

    const [createObject,setcreateObject] = useState({create:false,object:null})

    const raycaster = new Raycaster();
    const pointer = new Vector2();
    // const gridHelper = new GridHelper(100,100);

    useEffect(() => {
        fetchElements()
        // eslint-disable-next-line
    }, [])

    async function fetchElements() {
        const response = await client.get("/elements")
        setElements(response.data)
    }

    function mouse2dTo3d(event){
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
        raycaster.setFromCamera( pointer, camera );

        return raycaster.intersectObjects(scene.children);
    }

    function onMouseMoveCanvas(event){
        if (createObject.create){
            setShowElements("none")
            const intersects = mouse2dTo3d(event)
            if (intersects.length > 0){
                createObject.object.position.set(intersects[0].point.x,0,intersects[0].point.z)
            }
        }
    }

    function canvasOnClick(event){
        const intersects = mouse2dTo3d(event)

        // for ( let i = 0; i < intersects.length; i ++ ) {
        //     console.log(intersects[i])
        //     // ToDo oncklick object move him
        // }

        if (createObject.create){
            if (intersects.length > 0){
                createObject.object.position.set(intersects[0].point.x,0,intersects[0].point.z)
            }
            setcreateObject({create:false,object:null})
        }
    }

    function onCreatedCanvas(state){
        setScene(state.scene)
        setCamera(state.camera)
        // state.scene.add(gridHelper)
    }

    function OnClickBtnElements() {
        if(showElements == "none"){
            setShowElements("block")
            return
        }
        setShowElements("none")
    }

	return(
		<div className="createInterior">
            <div className="tools">
                <button onClick={OnClickBtnElements}>Elements</button>
            </div>
            
            <Canvas onMouseMove={onMouseMoveCanvas} onCreated={onCreatedCanvas} onClick={canvasOnClick} style={{background:`white`, height: `100%`, position: `absolute`, top:`0`, zIndex:`-1` }}>
                <Square />
                <ambientLight />
                <PerspectiveCamera position={[0, 10, 10]} makeDefault />
                <OrbitControls />
            </ Canvas>
            <ElementList showElements={showElements} scene={scene} setcreateObject={setcreateObject} elements={elements} />
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