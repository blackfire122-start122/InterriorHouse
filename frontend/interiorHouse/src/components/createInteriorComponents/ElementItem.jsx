import React, {Suspense} from 'react';
import '../../static/styles/createInterior/elementItem.css';

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const ElementItem = function ({setcreateObject, element}) {
	const gltf = useLoader(GLTFLoader, element.File)

	return(
		<div onClick={()=>{setcreateObject({create:true, object:gltf.scene.clone()})}} className="elementItem">
			<Canvas style={{height: `10em`, width: `95%`, background:`white` }}>
				<Suspense fallback={null}>
					<primitive object={gltf.scene} />
				</Suspense>
                <ambientLight />
                <PerspectiveCamera position={[2, 2, 2]} makeDefault />
                <OrbitControls />
            </ Canvas>
            <h3>{element.Name}</h3>
            <p>Type: {element.Type}</p>
        </div>
	)
}


export default ElementItem;