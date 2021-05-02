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
	const smallcube2 = primitives.createCubeWithVertexColorsBufferInfo(gl, 3);
	const sphere = primitives.createSphereWithVertexColorsBufferInfo(gl, 5, 12, 6);
	const smallsphere = primitives.createSphereWithVertexColorsBufferInfo(gl, 2, 12, 6);
	const coneBuf   = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 5, 0, 20, 12, 1, true, false);
  
	// Setup GLSL Program
	var programInfo = webglUtils.createProgramInfo(gl, ["vertex-shader-3d", "fragment-shader-3d"]);

 	

	// Setup the Camera Values
	var cameraAngleRadians = 0;
	var fieldOfViewRadians = 45;
	var cameraHeight = 20;

	var random= Math.random();
	var random2= Math.random();
	var random3= Math.random();
	var random4= Math.random();

	// Uniforms for each Object
	var bodyUni = {u_colorMult: [random, random2, random3, random4],u_matrix: m4.identity()};
	
	var headUni = {u_colorMult: [1, 1, 1, 1],u_matrix: m4.identity()};
	
	var leftEyeUni = {u_colorMult: [0, 1, 1, 1],u_matrix: m4.identity()};
	
	var rightEyeUni = {u_colorMult: [0, 1, 1, 1],u_matrix: m4.identity()};
	
	var leftFootUni = {u_colorMult: [1, 1, 1, 1,],u_matrix: m4.identity()};

	var rightEyelid = {u_colorMult: [0, 1, 1, 1],u_matrix: m4.identity()};

	var rightEyelid = {u_colorMult: [0, 1, 1, 1],u_matrix: m4.identity()};
	
	var rightFootUni = {u_colorMult: [1, 1, 1, 1,],u_matrix: m4.identity()};
	
	var leftLegUni = {u_colorMult: [0, 1, 0, 1], u_matrix: m4.identity()};
	
	var rightLegUni = {u_colorMult: [0, 1, 0, 1],u_matrix: m4.identity()};
	
	var leftArmUni = {u_colorMult: [0, 1, 0, 1],u_matrix: m4.identity()};
	
	var rightArmUni = {u_colorMult: [0, 1, 0, 1],u_matrix: m4.identity()};
	
	var leftHandUni = {u_colorMult: [1, 1, 1, 1,],u_matrix: m4.identity()};
	
	var rightHandUni = {u_colorMult: [1, 1, 1, 1,], u_matrix: m4.identity()};

	var leftEyeBrowMatrix = {u_colorMult: [1, 1, 1, 1,],u_matrix: m4.identity()};

	var rightEyeBrowMatrix = {u_colorMult: [1, 1, 1, 1,],u_matrix: m4.identity()};
	
	// Translate the Objects
	var translateBody = [-50, 0, 0];
	var translateHead = [-52,30, 0];
	var TranslateLEye = [-55, 25, 25];
	var TranslateREye = [-45, 25, 25];
	var TranslateLFoot = [-65, -45, -30];

	var TranslateLEyeBrow = [-55, 28, 30];
	var TranslateREyeBrow = [-45, 28, 30];

	var TranslateRFoot = [-45, -45, -30];
	var TranslateLLeg = [-62, -30, -10];
	var TranslateRLeg = [-43, -30, -10];
	var TranslateLArm = [-72, 0, 10];
	var TranslateRArm = [-25, 0, 10];
	var TranslateLHand = [-85, -5, 15];
	var TranslateRHand = [-10, -5, 15];



	var leftUp =0;
	
	//translate right arm for wave
	var translateup = 0;
	var translateup2 = 0;
	var translateup3 = -25;

	var translateupL = -72;
	var translateupL2 = 0;
	var translateupL3 =0;

	//CREATE JUMP
	var translateBodyj =  0;
	var translateHeadj = 30;
	var TranslateLEyej = 25;
	var TranslateREyej = 25;
	var TranslateLFootj = -45;
	var TranslateRFootj = -45;
	var TranslateLLegj = -30;
	var TranslateRLegj = -30;
	var TranslateLArmj = 0;
	var TranslateRArmj = 0;
	var TranslateLHandj = -5;
	var TranslateRHandj = -5;



	var count=0;
	

	function wave()
	{
		if(count <100)
        {
		translateup2 = translateup2+.1;
		translateup = translateup+.01;
		translateup3 = translateup3-.05;
		TranslateRArm = [translateup3, translateup2, 10];
		TranslateRHand = [translateup3+10, translateup2+12, 10];

		translateupL = translateupL +.05;
		translateupL2 = translateupL2+.1;
		translateupL3 = translateupL3+0.01;
		TranslateLArm = [-72,  translateupL2, 10];
		TranslateLHand = [-85,translateupL2+10, 15];
        drawScene();
        count= count+ 1;
                requestAnimationFrame(wave);
    }    
    if(count>=100&& count<200)
    {
    	translateup2 = translateup2-.1;
		translateup = translateup-.01;
		translateup3 = translateup3+.05;
		TranslateRArm = [translateup3, translateup2, 10];
		TranslateRHand = [translateup3+15, translateup2, 10];

		translateupL = translateupL -.05;
		translateupL2 = translateupL2-.1;
		translateupL3 = translateupL3-0.01;
		TranslateLArm = [-72,  translateupL2, 10];
		TranslateLHand = [-87,translateupL2-5, 15];
        drawScene();
        count= count+ 1;
                requestAnimationFrame(wave);
    }
  }
  count=0;
  var blinkeyes =28;
  		function jump()
  		{
  			if(count<50)
			{
  			translateBodyj = translateBodyj +1
			translateHeadj =  translateHeadj +1;
			TranslateLEyej = TranslateLEyej +.95;
			TranslateREyej = TranslateREyej+.95;
			TranslateLFootj = TranslateLFootj +1.05;
			TranslateRFootj =  TranslateRFootj+1.05;
			TranslateLLegj = TranslateLLegj+1.05;
			TranslateRLegj =  TranslateRLegj+1.05;
			TranslateLArmj = TranslateLArmj+1;
			TranslateRArmj = TranslateRArmj+1;
			TranslateLHandj = TranslateLHandj+1;
			TranslateRHandj =  TranslateRHandj+1;

			blinkeyes= blinkeyes+1;

			TranslateLEyeBrow = [-54, blinkeyes, 30];
	  		TranslateREyeBrow = [-44, blinkeyes, 30];

			translateBody = [-50, translateBodyj, 0];
			translateHead = [-52,translateHeadj, 0];
			TranslateLEye = [-55, TranslateLEyej, 25];
			TranslateREye = [-45, TranslateREyej, 25];
			TranslateLFoot = [-65, TranslateLFootj, -30];
			TranslateRFoot = [-45, TranslateRFootj, -30];
			TranslateLLeg = [-62, TranslateLLegj, -10];
			TranslateRLeg = [-43, TranslateRLegj, -10];
			TranslateLArm = [-72, TranslateLArmj, 10];
			TranslateRArm = [-25, TranslateRArmj, 10];
			TranslateLHand = [-85, TranslateLHandj, 15];
			TranslateRHand = [-10, TranslateRHandj, 15];
			drawScene();
			count = count+1;
			
			requestAnimationFrame(jump);
		}
		if(count>=50 && count<100)
		{
			translateBodyj = translateBodyj -1
			translateHeadj =  translateHeadj -1;
			TranslateLEyej = TranslateLEyej -.95;
			TranslateREyej = TranslateREyej-.95;
			TranslateLFootj = TranslateLFootj -1.05;
			TranslateRFootj =  TranslateRFootj-1.05;
			TranslateLLegj = TranslateLLegj-1.05;
			TranslateRLegj =  TranslateRLegj-1.05;
			TranslateLArmj = TranslateLArmj-1;
			TranslateRArmj = TranslateRArmj-1;
			TranslateLHandj = TranslateLHandj-1;
			TranslateRHandj =  TranslateRHandj-1;

			blinkeyes= blinkeyes-1;

			TranslateLEyeBrow = [-54, blinkeyes, 30];
	  		TranslateREyeBrow = [-44, blinkeyes, 30];

			translateBody = [-50, translateBodyj, 0];
			translateHead = [-52,translateHeadj, 0];
			TranslateLEye = [-55, TranslateLEyej, 25];
			TranslateREye = [-45, TranslateREyej, 25];
			TranslateLFoot = [-65, TranslateLFootj, -30];
			TranslateRFoot = [-45, TranslateRFootj, -30];
			TranslateLLeg = [-62, TranslateLLegj, -10];
			TranslateRLeg = [-43, TranslateRLegj, -10];
			TranslateLArm = [-72, TranslateLArmj, 10];
			TranslateRArm = [-25, TranslateRArmj, 10];
			TranslateLHand = [-85, TranslateLHandj, 15];
			TranslateRHand = [-10, TranslateRHandj, 15];
			drawScene();
			count = count+1;
			
			requestAnimationFrame(jump);

		}
  		}

  		var rotateHead =0;
  		var rotatebody =0;
  		var eyeRotate =-45;
  		var footRotate =0;
  		var legRotate =0;
  		var armRotate =250;
  		var HandRotate =0;
  		var armRotateL=150;
  	
  		count=0;

  		var upEyebrows =28;

  		function turnAround()
  		{
  			rotateHead = rotateHead+.1;
  			rotatebody = rotatebody+.1;
  			eyeRotate =eyeRotate+.1;
  			footRotate =footRotate+.1;
  			legRotate =legRotate+.1;
  			armRotate =armRotate+.1;
  			HandRotate =HandRotate+.1;
  			armRotateL=armRotateL+.1;
  			drawScene();
  			requestAnimationFrame(turnAround);

  		}
  		var TranslateLEyeBrow = [-54, 28, 30];
		var TranslateREyeBrow = [-44, 28, 30];
		var blinkeye=28;
  		var count2=0;
  		function blink()
  		{
  			if(count2<25)
  			{
  			blinkeye=blinkeye-.1;
  			TranslateLEyeBrow = [-54, blinkeye, 30];
  			TranslateREyeBrow = [-44, blinkeye, 30];
  			drawScene();
  			count2=count2+1;
  			requestAnimationFrame(blink);
  		    }
  		if(count2>=25 && count2<50)
	  		{
	  			blinkeye=blinkeye+.1;
	  			TranslateLEyeBrow = [-54, blinkeye, 30];
	  			TranslateREyeBrow = [-44, blinkeye, 30];
	  			drawScene();
	  			count2=count2+1;
	  			requestAnimationFrame(blink);
	  		}
  		}
  		count2=0;
  		function colorChange()
  		{
  			random= Math.random();
  			random2= Math.random();
  			random3= Math.random();
  			random4= Math.random();
  			bodyUni = {u_colorMult: [random, random2, random3, random4],u_matrix: m4.identity()};
  			drawScene();
  			

  		}

  		function onQuitClicked() {
       alert("The program is done");
     }

	document.onkeydown= function(e) 
			{
           	   if(e.key == 'w'){
	                wave();
	           	}
				if (e.key == 'j')
				{
					jump();
				}
				if(e.key == 't')
				{
					turnAround();
				}
				if(e.key=='b')
				{
					blink();
				}
				if(e.key =='c')
				{
					colorChange();
				}
				if(e.key=='q')
				{
					onQuitClicked();
				}


            };


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
		bodyUni.u_matrix = computeMatrix(viewProjectionMatrix, translateBody, -45, 0, rotatebody);
		webglUtils.setUniforms(programInfo, bodyUni);
		gl.drawArrays(gl.TRIANGLES, 0, cubeBuffer.numElements);
		//End of Robot's Body
		
		//Drawing the Robot's Head
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, mediumcube);
		headUni.u_matrix = computeMatrix(viewProjectionMatrix, translateHead, -45, 0, rotateHead);
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
		leftFootUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateLFoot, -45, 0, footRotate);
		webglUtils.setUniforms(programInfo, leftFootUni);	
		gl.drawArrays(gl.TRIANGLES, 0, smallcube.numElements);
		//End of Robot's Left Foot
	
		//Drawing the Robot's Right Foot
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, smallcube);
		rightFootUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateRFoot, -45, 0, footRotate);
		webglUtils.setUniforms(programInfo, rightFootUni);
		gl.drawArrays(gl.TRIANGLES, 0, smallcube.numElements);
		//End of Robot's Right Foot
		
		//Drawing the Robot's Left Leg
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
		leftLegUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateLLeg, 0.5, legRotate, 0);
		webglUtils.setUniforms(programInfo, leftLegUni);
		gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);
		//End of Robot's Left Leg
		
		//Drawing the Robot's Right Leg
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
		rightLegUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateRLeg, 0.5, legRotate, 0);
		webglUtils.setUniforms(programInfo, rightLegUni);
		gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);
		//End of Robot's Right Leg
		
		//Drawing the Robot's Left Arm
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
		leftArmUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateLArm, armRotateL, translateupL3, -45);
		webglUtils.setUniforms(programInfo, leftArmUni);
		gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);		
		//End of Robot's Left Arm
		
		//Drawing the Robot's Right Arm
		
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
		rightArmUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateRArm, armRotate, -translateup, 45);
		webglUtils.setUniforms(programInfo, rightArmUni);
		gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);
		//End of Robot's Right Arm
		
		//Drawing the Robot's Left Hand
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, cubeBuffer2);
		leftHandUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateLHand, -45, 0, armRotateL);
		webglUtils.setUniforms(programInfo, leftHandUni);
		gl.drawArrays(gl.TRIANGLES, 0, cubeBuffer2.numElements);
		//End of Robot's Left Hand
		
		//Drawing the Robot's Right Hand
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, cubeBuffer2);
		rightHandUni.u_matrix = computeMatrix(viewProjectionMatrix, TranslateRHand, -45, 0, armRotate);
		webglUtils.setUniforms(programInfo, rightHandUni);
		gl.drawArrays(gl.TRIANGLES, 0, cubeBuffer2.numElements);

		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, smallcube2);
		leftEyeBrowMatrix.u_matrix = computeMatrix(viewProjectionMatrix, TranslateLEyeBrow, -45, 0, 0);
		webglUtils.setUniforms(programInfo, leftEyeBrowMatrix);
		gl.drawArrays(gl.TRIANGLES, 0, smallcube2.numElements);

		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, smallcube2);
		rightEyeBrowMatrix.u_matrix = computeMatrix(viewProjectionMatrix, TranslateREyeBrow, -45, 0, 0);
		webglUtils.setUniforms(programInfo, rightEyeBrowMatrix);
		gl.drawArrays(gl.TRIANGLES, 0, smallcube2.numElements);
		
	}
}

main();
