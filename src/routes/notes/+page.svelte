<script>
    import { draggable } from '@neodrag/svelte';
    import notepad from '$lib/images/notepad.png';
    import UserButton from 'clerk-sveltekit/client/UserButton.svelte'

    let notes = []
    notes = [...notes, {top: 603, left: 565, width: 836, height: 501, text: "wassup lil bruv"}]
    notes = [...notes, {top: 100, left: 100, width: 400, height: 400, text: "I do be a little bit of a cool kid huh"}]

    let noteFacts = []
    for (let i = 0; i < notes.length; i++) {
        noteFacts = [...noteFacts, {pos: 0, width: 0, height: 0, content: 0}]
    }
    
    let produceNotes = () => {
        for (let i = 0; i < noteFacts.length; i++) {
            console.log(noteFacts[i].pos.getBoundingClientRect().left)
            console.log(noteFacts[i].pos.getBoundingClientRect().top)
            console.log(noteFacts[i].width)
            console.log(noteFacts[i].height)
            console.log(noteFacts[i].content.innerText)
        }
    }
    //console.log(t.getBoundingClientRect().left)
</script>

<body>


{#each notes as {top, left, width, height, text}, i}
    <button bind:this={noteFacts[i].pos} use:draggable={{ cancel: '.content' }} class="notepad" style="top: {top}px; left: {left}px" on:mousedown={() => {
        console.log("wassup")
        for (let j = 0; j < noteFacts.length; j++) {
            if (j == i) {
                noteFacts[j].pos.style.zIndex = 2
            }
            else {
                noteFacts[j].pos.style.zIndex = 1
            }
        }
    }}>
        <div class="header">
            <img src={notepad} alt="notepad" class="notepadPic"/>
            <div class="title">*wassup - Notepad.exe</div>
        </div>
        <div bind:clientHeight={noteFacts[i].height} bind:clientWidth={noteFacts[i].width} class="content" bind:this={noteFacts[i].content}
        contenteditable="true" spellcheck="false"  style="height: {height}px; width: {width}px"> {text}</div>
    </button>
{/each}

</body>


<style>

    .notepadPic{
        width:28px;
        height:auto;
    }
    .header{
        padding-left:6px;
        display:flex;
        flex-direction: row;
    }
    .notepad{
        all: unset;
        z-index: 1;
        position:absolute;
        width:fit-content;
        font-size: 15pt;
        font-family: Consolas, monospace;
        color:black;
        background-color: white;
        border:solid;
        border-color:black;
        border-width: 1px;;
    }
    .title{
        padding:4px;
        padding-bottom: 8px;
    }
    .content{
        border:solid;
        border-color: #f0f0f0;
        background-color: white;
        height:50px;
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

    body {
        min-height: 100vh;
        margin: 0;
        background-attachment: fixed;
        background-color: var(--color-bg-1);
        background-size: 100vw 100vh;
        background-image: radial-gradient(
                50% 50% at 50% 50%,
                rgba(255, 255, 255, 0.75) 0%,
                rgba(255, 255, 255, 0) 100%
            ),
            linear-gradient(180deg, var(--color-bg-0) 0%, var(--color-bg-1) 15%, var(--color-bg-2) 50%);
    }
</style>