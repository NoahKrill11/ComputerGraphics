"use strict";

"use strict";

function main() {
	// Get the WebGL context
	var canvas = document.querySelector("#canvas");
	var gl = canvas.getContext("webgl");
	if (!gl) {
		return;
	}

	// Creating Buffer Info for Objects(Cube, Small Cube, and Sphere)
	const cubeBuffer = primitives.createCubeWithVertexColorsBufferInfo(gl, 30);
	const cubeBuffer2 = primitives.createCubeWithVertexColorsBufferInfo(gl, 5);
	const mediumcube = primitives.createCubeWithVertexColorsBufferInfo(gl, 20);
	const smallcube = primitives.createCubeWithVertexColorsBufferInfo(gl, 10);
	const sphere = primitives.createSphereWithVertexColorsBufferInfo(gl, 5, 12, 6);
	const smallsphere = primitives.createSphereWithVertexColorsBufferInfo(gl, 2, 12, 6);
	const coneBuf   = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 5, 0, 20, 12, 1, true, false);
  
	// Setup GLSL Program
	var programInfo = webglUtils.createProgramInfo(gl, ["vertex-shader-3d", "fragment-shader-3d"]);

	// Setup the Camera Values
	var cameraAngleRadians = 0;
	var fieldOfViewRadians = 45;
	var cameraHeight = 20;

	// Uniforms for each Object
	var bodyUni = {u_colorMult: [0.5, 1, 0.5, 1],u_matrix: m4.identity()};
	
	var headUni = {u_colorMult: [1, 1, 1, 1],u_matrix: m4.identity()};
	
	var leftEyeUni = {u_colorMult: [0, 1, 1, 1],u_matrix: m4.identity()};
	
	var rightEyeUni = {u_colorMult: [0, 1, 1, 1],u_matrix: m4.identity()};
	
	var leftFootUni = {u_colorMult: [1, 1, 1, 1,],u_matrix: m4.identity()};
	
	var rightFootUni = {u_colorMult: [1, 1, 1, 1,],u_matrix: m4.identity()};
	
	var leftLegUni = {u_colorMult: [0, 1, 0, 1], u_matrix: m4.identity()};
	
	var rightLegUni = {u_colorMult: [0, 1, 0, 1],u_matrix: m4.identity()};
	
	var leftArmUni = {u_colorMult: [0, 1, 0, 1],u_matrix: m4.identity()};
	
	var rightArmUni = {u_colorMult: [0, 1, 0, 1],u_matrix: m4.identity()};
	
	var leftHandUni = {u_colorMult: [1, 1, 1, 1,],u_matrix: m4.identity()};
	
	var rightHandUni = {u_colorMult: [1, 1, 1, 1,], u_matrix: m4.identity()};
	
	// Translate the Objects
	var translateBody = [-50, 0, 0];
	var translateHead = [-52,30, 0];
	var TranslateLEye = [-55, 25, 25];
	var TranslateREye = [-45, 25, 25];
	var TranslateLFoot = [-65, -45, -30];
	var TranslateRFoot = [-45, -45, -30];
	var TranslateLLeg = [-62, -30, -10];
	var TranslateRLeg = [-43, -30, -10];
	var TranslateLArm = [-72, 0, 10];
	var TranslateRArm = [-25, 0, 10];
	var TranslateLHand = [-85, -5, 15];
	var TranslateRHand = [-10, -5, 15];

	function computeMatrix(viewProjectionMatrix, translation, xRotation, yRotation, zRotation) {
		var matrix = m4.translate(viewProjectionMatrix, translation[0], translation[1],	translation[2]);
		matrix = m4.xRotate(matrix, xRotation);
		matrix = m4.yRotate(matrix, yRotation);
		return m4.zRotate(matrix, zRotation);
	}

	requestAnimationFrame(drawScene);

	// Draw the scene.
	function drawScene(time) {		
		webglUtils.resizeCanvasToDisplaySize(gl.canvas);

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.enable(gl.CULL_FACE);
		gl.enable(gl.DEPTH_TEST);

		// Clear the canvas AND the depth buffer.
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// Compute the projection matrix
		var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
		var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

		// Compute the camera's matrix using look at.
		var cameraMatrix = m4.yRotation(cameraAngleRadians);
		var cameraMatrix = m4.translate(cameraMatrix, 0, 0, 200 * 1.5);

		// Make a view matrix from the camera matrix.
		var viewMatrix = m4.inverse(cameraMatrix);

		var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

	
		//Drawing the body
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, cubeBuffer);
		bodyUni.u_matrix = computeMatrix(viewProjectionMatrix, translateBody, -45, 0, 0);
		webglUtils.setUniforms(programInfo, bodyUni);
		gl.drawArrays(gl.TRIANGLES, 0, cubeBuffer.numElements);
		//End of Robot's Body
		
		//Drawing the Robot's Head
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, mediumcube);
		headUni.u_matrix = computeMatrix(viewProjectionMatrix, translateHead, -45, 0, 0);
		webglUtils.setUniforms(programInfo, headUni);
		gl.drawArrays(gl.TRIANGLES, 0, mediumcube.numElements);
		//End of Robot's Head
		
		//Drawing the Robot's Left Eye
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, smallsphere);
		leftEyeUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateLEye, -45, 0, 0);
		webglUtils.setUniforms(programInfo, leftEyeUni);
		gl.drawArrays(gl.TRIANGLES, 0, smallsphere.numElements);
		//End of Robot's Left Eye
		
		//Drawing the Robot's Right Eye
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, smallsphere);
		rightEyeUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateREye, -45, 0, 0);
		webglUtils.setUniforms(programInfo, rightEyeUni);
		gl.drawArrays(gl.TRIANGLES, 0, smallsphere.numElements);
		//End of Robot's Right Eye
		
		//Drawing the Robot's Left Foot
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, smallcube);
		leftFootUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateLFoot, -45, 0, 0);
		webglUtils.setUniforms(programInfo, leftFootUni);	
		gl.drawArrays(gl.TRIANGLES, 0, smallcube.numElements);
		//End of Robot's Left Foot
	
		//Drawing the Robot's Right Foot
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, smallcube);
		rightFootUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateRFoot, -45, 0, 0);
		webglUtils.setUniforms(programInfo, rightFootUni);
		gl.drawArrays(gl.TRIANGLES, 0, smallcube.numElements);
		//End of Robot's Right Foot
		
		//Drawing the Robot's Left Leg
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
		leftLegUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateLLeg, 0.5, 0, 0);
		webglUtils.setUniforms(programInfo, leftLegUni);
		gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);
		//End of Robot's Left Leg
		
		//Drawing the Robot's Right Leg
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
		rightLegUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateRLeg, 0.5, 0, 0);
		webglUtils.setUniforms(programInfo, rightLegUni);
		gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);
		//End of Robot's Right Leg
		
		//Drawing the Robot's Left Arm
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
		leftArmUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateLArm, 150, 0, -45);
		webglUtils.setUniforms(programInfo, leftArmUni);
		gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);		
		//End of Robot's Left Arm
		
		//Drawing the Robot's Right Arm
		
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
		rightArmUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateRArm, 150, 0, 45);
		webglUtils.setUniforms(programInfo, rightArmUni);
		gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);
		//End of Robot's Right Arm
		
		//Drawing the Robot's Left Hand
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, cubeBuffer2);
		leftHandUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateLHand, -45, 0, -45);
		webglUtils.setUniforms(programInfo, leftHandUni);
		gl.drawArrays(gl.TRIANGLES, 0, cubeBuffer2.numElements);
		//End of Robot's Left Hand
		
		//Drawing the Robot's Right Hand
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, cubeBuffer2);
		rightHandUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateRHand, -45, 0, 45);
		webglUtils.setUniforms(programInfo, rightHandUni);

		gl.drawArrays(gl.TRIANGLES, 0, cubeBuffer2.numElements);
		//End of Robot's Right Hand
		
	}
}

main();
