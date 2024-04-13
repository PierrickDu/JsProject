let inputState = {left: 0, right: 0, up: 0, down: 0}
let mousePos = { x: 0, y: 0 }

function addMouseListener() {
    window.onmousemove = (event) => {
        var rect = event.target.getBoundingClientRect()
        mousePos.x = event.clientX - rect.left;
        mousePos.y = event.clientY - rect.top;
    }

    window.onmousedown = (event) => {
        if(event.which==1){
            inputState.rc = true;
        }
    }

    window.onmouseup = (event) => {
        if(event.which==1){
            inputState.rc = false;
        }
    }
}

function addKeyboardListener() {
    window.onkeydown = (event) => {
        console.log(event.key);
        switch (event.key) {
            case 'q':
                inputState.left = -1;                
                break;
            case 'd':
                inputState.right = 1;
                break;
            case 'z':
                inputState.up = -1;
                break;
            case 's':
                inputState.down = 1;
                break;
            case ' ':
                inputState.space = true;
                break;
        }
    }

    window.onkeyup = (event) => {
        console.log(event.key);
        switch (event.key) {
            case 'q':
                inputState.left = 0;
                break;
            case 'd':
                inputState.right = 0;
                break;
            case 'z':
                inputState.up = 0;
                break;
            case 's':
                inputState.down = 0;
                break;
            case ' ':
                inputState.space = false;
                break;
        }
    }

}

export { addMouseListener, addKeyboardListener, inputState, mousePos }