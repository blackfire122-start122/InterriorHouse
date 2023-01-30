import React, {useState, useEffect } from 'react';

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { DoubleSide, Raycaster, Vector2, GridHelper, ObjectLoader, Scene, BoxBufferGeometry, MeshStandardMaterial, Mesh } from "three";

import ElementList from './createInteriorComponents/ElementList'

import '../static/styles/createInterior/createInterior.css';

import JSZip from 'jszip';
import FileSaver from 'file-saver';
const zip = new JSZip();

const CreateInterior = function ({client}) {
    const [showElements,setShowElements] = useState("none")
    const [elements,setElements] = useState([])

    const [scene,setScene] = useState(new Scene())
    const [camera,setCamera] = useState(0)

    const [createObject,setcreateObject] = useState({create:false,object:null})

    const raycaster = new Raycaster();
    const pointer = new Vector2();

    let createWallMode = false
    let createWall = false

    // const gridHelper = new GridHelper(100,100);

    useEffect(() => {
        fetchElements()
        // eslint-disable-next-line
    }, [])

    async function fetchElements() {
        const response = await client.get("/elements")
        setElements(response.data)
    }

    async function saveScene(sceneJson) {
        zip.file('1.json', JSON.stringify(sceneJson));
        zip.generateAsync({type:"blob", compression:"DEFLATE", compressionOptions: { level: 9 }}).then(async function (content) {
            await client.post("/user/saveScene", content)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        });
    }

    function mouse2dTo3d(event){
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
        raycaster.setFromCamera( pointer, camera );

        return raycaster.intersectObjects(scene.children);
    }

    function onMouseMoveCanvas(event){
        if (createWallMode && createWall){
            const intersects = mouse2dTo3d(event)
            if (intersects.length > 0){
                createWall.position.set(intersects[0].point.x,0,intersects[0].point.z)
            }
            
        }

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

        if(createWallMode && !createWall){
            createWall = new Mesh(new BoxBufferGeometry(2,2,2), new MeshStandardMaterial())
            
            const intersects = mouse2dTo3d(event)
            createWall.position.set(intersects[0].point.x,0,intersects[0].point.z)
            scene.add(createWall)

            console.log(createWall)

        }else if(createWallMode && createWall){
            createWall = false
        }

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
        if(showElements === "none"){
            setShowElements("block")
            return
        }
        setShowElements("none")
    }

    function OnClickBtnSave() {
        const sceneJson = scene.toJSON()
        saveScene(sceneJson)
    }

    function OnClickBtnLoad() {
        client.get("http://127.0.0.1:80/media/interiorFiles/1.zip",{ withCredentials: false }).then(res => {

            console.log(res)

            // zip.loadAsync(res.data).then((content)=>{
            //     console.log(content)
            // })

            // let LoadScene = new ObjectLoader().parse(res.data)
            // setScene(LoadScene)
        })
    }

    function OnClickBtnCreateWallModes(){
        createWallMode = !createWallMode
        camera.position.set(0,30,0)
    }

	return(
		<div className="createInterior">
            <div className="tools">
                <button onClick={OnClickBtnCreateWallModes}>Create walls</button>
                <button onClick={OnClickBtnElements}>Elements</button>
                <button onClick={OnClickBtnSave}>Save</button>
                <button onClick={OnClickBtnLoad}>Load</button>
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
      <planeBufferGeometry />
      <meshBasicMaterial color="gray" side={DoubleSide} />
    </mesh>
  );
}

export default CreateInterior;