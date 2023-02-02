import React, {useState, useEffect } from 'react';

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { useLocation } from 'react-router-dom'

import { DoubleSide, Raycaster, Vector2, ObjectLoader,
    Scene, BoxBufferGeometry, MeshStandardMaterial,
    Mesh, SphereGeometry, MeshPhongMaterial, TextureLoader,
    BackSide } from "three";

import ElementList from './createInteriorComponents/ElementList'

import '../static/styles/createInterior/createInterior.css';

import JSZip from 'jszip';
const zip = new JSZip();

const CreateInterior = function ({client}) {
    const state = useLocation().state

    const [showElements,setShowElements] = useState("none")
    const [elements,setElements] = useState([])

    const [scene,setScene] = useState(new Scene())
    const [camera,setCamera] = useState(0)

    const [createObject,setcreateObject] = useState({create:false,object:null})

    const raycaster = new Raycaster();
    const pointer = new Vector2();

    let createWallMode = false
    let createWall = false
    let moveObjectMode = false
    let moveObject = false

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
        zip.file(state.interior.Id+'.json', JSON.stringify(sceneJson));
        zip.generateAsync({type:"string", compression:"DEFLATE", compressionOptions: { level: 9 }}).then(async function (content) {
            let formData = new FormData();
            let blob = new Blob([content], { type: 'text/plain' });
            var file = new File([blob], state.interior.Id+".zip", {type: "text/plain"});

            formData.append("file", file);
            formData.append("interiorId", state.interior.Id);

            await client.post("/user/saveScene", formData)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        });
    }

    async function loadScene(scene, url){
        console.log("get file")
        // full url for nginx
        client.get("http://localhost/"+url,{ withCredentials: false }).then(res => {
            console.log("unzip file")
            zip.loadAsync(res.data).then((content)=>{
                content.files[state.interior.Id+".json"].async("text").then((txt)=>{
                    let LoadScene = new ObjectLoader().parse(JSON.parse(txt))
                    scene.children = LoadScene.children
                    // ToDo what ??? logic
                   
                    setScene(LoadScene)

                    console.log("scene created")
                })
            })
        })
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

        if (moveObjectMode){
            const intersects = mouse2dTo3d(event)
            if (intersects.length > 0){
                moveObject.position.set(intersects[0].point.x,intersects[0].point.y,intersects[0].point.z)
            }
        }
    }

    function canvasOnClick(event){
        const intersects = mouse2dTo3d(event)
        // for ( let i = 0; i < intersects.length; i ++ ) {
        //     if (intersects[i].object.name !== "floor"){
        //         moveObject = intersects[i].object
        //         moveObjectMode = true
        //         break
        //     }
        //     if(moveObjectMode && moveObject){
        //         moveObjectMode = false
        //         moveObject = false
        //     }
        // }

        if(createWallMode && !createWall){
            createWall = new Mesh(new BoxBufferGeometry(2,2,2), new MeshStandardMaterial())
            // createWall.position.set(intersects[0].point.x,0,intersects[0].point.z)
            scene.add(createWall)

            for (let i = createWall.geometry.attributes.normal.array.length-1; i >= 0; i--) {
                console.log(createWall.geometry.attributes.normal.array[i])
            }

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

    function onCreatedCanvas(stateCanvas){
        setScene(stateCanvas.scene)
        setCamera(stateCanvas.camera)

        if (state){
            loadScene(stateCanvas.scene, state.interior.File)
        }else{
            stateCanvas.scene.add(Skybox())
        }

        // stateCanvas.scene.add(gridHelper)
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
        loadScene(scene, "http://127.0.0.1:80/media/interiorFiles/1.zip")
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
                <PerspectiveCamera position={[0, 30, 10]} makeDefault />
                <OrbitControls />
            </ Canvas>

            <ElementList showElements={showElements} scene={scene} setcreateObject={setcreateObject} elements={elements} />
        </div>
	)
}

function Square() {
  return (
    <mesh name={"floor"} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[30, 30, 30]}>
      <planeBufferGeometry />
      <meshBasicMaterial color="green" side={DoubleSide} />
    </mesh>
  );
}

export default CreateInterior;

function Skybox(){
    let texture = new TextureLoader().load('http://localhost:80/media/skyBoxImages/sky1.jpg');

    let sky = new Mesh(new SphereGeometry(1000, 25, 25), new MeshPhongMaterial({map: texture}));
    sky.material.side = BackSide;
    
    return sky

}