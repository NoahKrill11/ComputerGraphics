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

	var random= Math.floor(Math.random()*1)+1;
	var random2= Math.floor(Math.random()*1)+1;
	var random3= Math.floor(Math.random()*1)+1;
	var random4= Math.floor(Math.random()*1)+1;

	// Uniforms for each Object
	var bodyUni = {u_colorMult: [random, random2, random3, random4],u_matrix: m4.identity()};
	var headUni = {u_colorMult: [random, random2, random3, random4],u_matrix: m4.identity()};
	var legUni = {u_colorMult: [random, random2, random3, random4],u_matrix: m4.identity()};
	var tailUni = {u_colorMult: [random, random2, random3, random4],u_matrix: m4.identity()};
	var ballb = {u_colorMult: [random, random2, random3, random4],u_matrix: m4.identity()};
	var cube12 = {u_colorMult: [random, random2, random3, random4],u_matrix: m4.identity()};
	var cone12 = {u_colorMult: [random, random2, random3, random4],u_matrix: m4.identity()};


	var tailrot =-5;
	var translateLegW = -40;
	var translateLegW2 = -60;
	//var transBodyForSit = -50;
	var transbod =-50;
	var transBodyForSit2 = 0;
	//var translateLegW3 = -60;
	// Translate the Objects
	var translateBody = [transbod, transBodyForSit2, 0];
	var transHead = [-25,5,0];
	var transLeg =[translateLegW ,-28,0];
	var transLeg2 =[translateLegW,-28,-25];
	var transLeg3 =[translateLegW2,-28,0];
	var transLeg4 =[translateLegW2,-28,-25];
	var ttail =-70;
	var transTail = [ttail,0,0];
	var rotatebody =0;

	var rotateleg =0;
	var rotateleg2=0;
	var ballCount =0;
	var cubeCount=0;
	var ConeCount=0;
	
	var transHe = -25;
	var cords=[0,0,0];
	var cords2=[0,0,0];
	var cords3=[0,0,0];
	
	var count =0;

	function createObject()
  		{
  			var object= window.prompt("Which object would you like ");
  			var x= window.prompt("What is the X coordinate  ");
  			var y= window.prompt("What is the Y coordinate  ");
  			var z= window.prompt("What is the Z coordinate  ");

  			if(object=="Sphere")
  			{
  		    ballCount=1;
  		    cords=[x,y,z];
  			drawScene();
  			}
  			if(object=="Cube")
  			{
  			cords2=[x,y,z];
  		    cubeCount=1;
  			drawScene();
  			}
  			if(object=="Cone")
  			{
  			cords3=[x,y,z];
  		    ConeCount=1;
  			drawScene();
  			}
  		}
	
  		
	function walk()
	  	{
	  		while(count<40)
	  		{
	  		//alert(count);
	  		if(count%2==0)
	  		{
	  			ttail=ttail+1;
	  			transTail = [ttail,0,0];
	  			translateLegW= translateLegW +1;
	  			transbod = transbod +1;
	  			transHe = transHe+1;
	  			rotateleg = rotateleg+.1;
	  			transLeg = [translateLegW,-28,0];
	  			transLeg2 = [translateLegW,-28,-25];
	  			translateBody = [transbod, 0, 0];
				transHead = [transHe,5,0];
	  			translateLegW2= translateLegW2 +1;
	  			rotateleg2 = rotateleg2+.1;
	  			transLeg3 = [translateLegW2,-28,0];
	  			transLeg4 = [translateLegW2,-28,-25];
	  			drawScene();
	  			requestAnimationFrame(walk);
	  		}
	  		if(count%2==1)
	  		{
	  			ttail=ttail+1;
	  			transTail = [ttail,0,0];
	  			translateLegW= translateLegW +1;
	  			transbod = transbod +1;
	  			transHe = transHe+1;
	  			rotateleg = rotateleg-.1;
	  			transLeg = [translateLegW,-28,0];
	  			transLeg2 = [translateLegW,-28,-25];
	  			translateBody = [transbod, 0, 0];
				transHead = [transHe,5,0];
	  			translateLegW2= translateLegW2 +1;
	  			rotateleg2 = rotateleg2-.1;
	  			transLeg3 = [translateLegW2,-28,0];
	  			transLeg4 = [translateLegW2,-28,-25];
	  			drawScene();
	  			requestAnimationFrame(walk);
	  		}	
	  		++count;
	  		}
	  	}

	  function tailUp()
	  {
	  	if(tailrot>-5.4)
	  	tailrot = tailrot-.5;
	  	drawScene();
	  }
	  function tailDown()
	  {
	  	if(tailrot<-4.5)
	  	tailrot = tailrot+.7;
	  	drawScene();
	  }

	  	var count2 = 0;
	  	function sit()
	  	{
	  		while(count2<20)
	  		{
	  			rotateleg2=rotateleg2+.05;
	  			transBodyForSit2=transBodyForSit2-.3;
	  			translateBody = [transbod, transBodyForSit2, 0];
	  			transLeg3 = [translateLegW2,-28,0];

	  			drawScene();
	  			requestAnimationFrame(sit);
	  			
	  			++count2;
	  		}

	  	}
  		

  		function onQuitClicked() {
       alert("The program is done");
     }

	document.onkeydown= function(e) 
			{
           	   if(e.key == 'w'){
	               walk();
	           	}
				if(e.key == 'u')
				{
					tailUp();
				}
				if(e.key == 'd')
				{
					tailDown();
				}
				if(e.key == "s")
				{
					sit();
				}
				if(e.key =='c')
				{
					createObject();
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

		//Drawing the head
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, mediumcube);
		headUni.u_matrix = computeMatrix(viewProjectionMatrix, transHead, -45, 0, rotatebody);
		webglUtils.setUniforms(programInfo, headUni);
		gl.drawArrays(gl.TRIANGLES, 0, mediumcube.numElements);
		//End of Robot's head

		//Drawing the head
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
		legUni.u_matrix = computeMatrix(viewProjectionMatrix, transLeg, 0, 0, rotateleg);
		webglUtils.setUniforms(programInfo, legUni);
		gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);
		//End of Robot's head

		//Drawing the head
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
		legUni.u_matrix = computeMatrix(viewProjectionMatrix, transLeg2, 0, 0, rotateleg);
		webglUtils.setUniforms(programInfo, legUni);
		gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);
		//End of Robot's head

		//Drawing the head
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
		legUni.u_matrix = computeMatrix(viewProjectionMatrix, transLeg3, 0, 0, rotateleg2);
		webglUtils.setUniforms(programInfo, legUni);
		gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);
		//End of Robot's head

		//Drawing the head
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
		legUni.u_matrix = computeMatrix(viewProjectionMatrix, transLeg4, 0, 0, rotateleg2);
		webglUtils.setUniforms(programInfo, legUni);
		gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);
		//End of Robot's head

		//Drawing the head
		gl.useProgram(programInfo.program);
		webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
		tailUni.u_matrix = computeMatrix(viewProjectionMatrix, transTail, 0, 0, tailrot);
		webglUtils.setUniforms(programInfo, tailUni);
		gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);

		if(ballCount==1){
			gl.useProgram(programInfo.program);
			webglUtils.setBuffersAndAttributes(gl, programInfo, sphere);
			ballb.u_matrix = computeMatrix(viewProjectionMatrix, cords, 0, 0, 0);
			webglUtils.setUniforms(programInfo, ballb);
			gl.drawArrays(gl.TRIANGLES, 0, sphere.numElements);
		}
		if(cubeCount==1)
		{
			gl.useProgram(programInfo.program);
			webglUtils.setBuffersAndAttributes(gl, programInfo, cubeBuffer);
			cube12.u_matrix = computeMatrix(viewProjectionMatrix, cords2, 0, 0, 0);
			webglUtils.setUniforms(programInfo, cube12);
			gl.drawArrays(gl.TRIANGLES, 0, cubeBuffer.numElements);

		}
		if(ConeCount==1)
		{
			gl.useProgram(programInfo.program);
			webglUtils.setBuffersAndAttributes(gl, programInfo, coneBuf);
			cone12.u_matrix = computeMatrix(viewProjectionMatrix, cords3, 0, 0, 0);
			webglUtils.setUniforms(programInfo, cone12);
			gl.drawArrays(gl.TRIANGLES, 0, coneBuf.numElements);

		}

		//End of Robot's head
		
		
	}
}

main();
