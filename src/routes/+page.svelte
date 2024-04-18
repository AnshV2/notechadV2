<script>
    import notepad from '$lib/images/notepad.png';
    
    import { draggable } from '@neodrag/svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="title">NoteChadV2</div>
<div class="subTitle">Create and save your notepads seamlessly and noteChad will take care of the rest</div>

<div class="loginContainer">
    <a class="login" href = '/signin'>Log In</a>
</div>


<div class="notepadContainer">
<button use:draggable={{ cancel: '.content' }} class="notepad" >
    <div class="header">
        <img src={notepad} alt="notepad" class="notepadPic"/>
        <div class="titlea">*Example - Notepad.exe</div>
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div  class="content" 
        contenteditable="true" spellcheck="false"  > 
        This is An exmaple Notepad!

Feel free to move it around, resize it, change this text, emotionally/physically abuse it, idk whatever floats your boat
When Actually using the app after Logging in using the CTRL S keyboard shortcut will save all your notepads!
    </div>
</button>
</div>

<style>
    .notepadContainer{
        width: 100%;
        display:flex;
        justify-content:center;
        margin-top:100px;
    }

    .notepad{
        justify-self: center;
        all: unset;
        z-index: 1;
        position:absolute;
        width:fit-content;
        font-size: 11pt;
        font-family: Consolas, monospace;
        color:black;
        background-color: white;
        border:solid;
        border-color:black;
        border-width: 1px;;
    }

    .titlea{
        padding:4px;
        padding-bottom: 8px;
    }

    .notepadPic{
        width:28px;
        height:auto;
    }

    .header{
        padding-left:6px;
        display:flex;
        flex-direction: row;
    }

	.title{
		margin-top: 40px;
		width:100%;
		text-align: center;
		font-size: 30pt;
	}

	.subTitle{
		margin-top: 20px;
		width: 100%;
		text-align: center;
		font-size: 15pt
	}

    .loginContainer{
        margin-top:20px;
        width:100%;
        display:flex;
        align-items: center;
        justify-content: center;
    }

    .login{
        justify-self: center;
        margin-left: 0.5vh;
        margin-top: 0.5vh;;
        background-color: white;
        color: black;
        border: 2px solid darksalmon;
        padding: 5px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        border-radius: 5px;
    }

    .login:hover{
        background-color:darksalmon;
        color: white;
    }

    .content{
        white-space: pre-wrap;
        border:solid;
        border-color: #f0f0f0;
        background-color: white;
        width:1100px;
        height:500px;
        resize: both;
        overflow: auto;
        padding:4px;
    }
    .content:focus{
        outline: none;
    }



    :global(body) { /* this will apply to <body> */ margin: 0; padding: 0; background-color: hsl(209, 36%, 86%); overflow-x: hidden;}

    :root {
        --font-body: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
            Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        --font-mono: 'Fira Mono', monospace;
        --color-bg-0: rgb(202, 216, 228);
        --color-bg-1: hsl(209, 36%, 86%);
        --color-bg-2: hsl(224, 44%, 95%);
        --color-theme-1: #ff3e00;
        --color-theme-2: #4075a6;
        --color-text: rgba(0, 0, 0, 0.7);
        --column-width: 42rem;
        --column-margin-top: 4rem;
        font-family: var(--font-body);
        color: var(--color-text);
    }
</style>