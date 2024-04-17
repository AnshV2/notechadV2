<script>
    import { draggable } from '@neodrag/svelte';
    import notepad from '$lib/images/notepad.png';
    import UserButton from 'clerk-sveltekit/client/UserButton.svelte'
    import { onMount } from 'svelte';

    onMount(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        };
    });

    async function handleKeyDown(event) {
        // Check if Ctrl key and S key are pressed
        if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent default browser save action

        for (let i = 0; i < noteFacts.length; i++) {
            const response = await fetch('/api/update', {
                method: 'POST',
                body: JSON.stringify({ name: notes[i].name, height: noteFacts[i].height, width: noteFacts[i].width, top: noteFacts[i].top, left: noteFacts[i].left, content: noteFacts[i].content }),
                headers: {
                    'content-type': 'application/json'
                }
            });

            let total = await response.json()
        }
        // Call your custom command function here
        console.log("wassup")
        }
    }

    export let data;
    let notes = data.data

    $: noteFacts = notes.map(note => ({top: note.top, left: note.left, width: note.width, height: note.height, content: note.content, layer: 1}));
    
    

    let inName = "Name";

</script>

<body>

    <button on:click={() => {
        console.log(noteFacts)
    }}>click</button>

<input bind:value={inName}>
<button on:click={async() => {
    const response = await fetch('/api/addnew', {
        method: 'POST',
        body: JSON.stringify({ name: inName, height: 400, width: 400, top: 300, left: 300, content: "enyoy" }),
        headers: {
            'content-type': 'application/json'
        }
    });

    let total = await response.json()
    notes = [...notes, { name: inName, height: 400, width: 400, top: 300, left: 300, content: "enyoy"}]
}}>Create Notepad</button>


{#each notes as {top, left, width, height, content, name}, i}
    <button use:draggable={{ cancel: '.content' }} class="notepad" style="top: {top}px; left: {left}px;  z-index: {noteFacts[i].layer}" 
    on:mouseup={e => {noteFacts[i].left = e.currentTarget.getBoundingClientRect().left}}
    on:mouseup={e => {noteFacts[i].top = e.currentTarget.getBoundingClientRect().top}}
    on:mousedown={() => {
        for (let j = 0; j < noteFacts.length; j++) {
            if (j == i) {
                noteFacts[j].layer = 2
            }
            else {
                noteFacts[j].layer = 1
            }
        }
    }}>
        <div class="header">
            <img src={notepad} alt="notepad" class="notepadPic"/>
            <div class="title">*{name} - Notepad.exe</div>
        </div>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div  class="content" 
            on:mouseup={e => {noteFacts[i].width = e.currentTarget.getBoundingClientRect().width - 13}}
            on:mouseup={e => {noteFacts[i].height = e.currentTarget.getBoundingClientRect().height - 13}}
            on:input={e => {noteFacts[i].content = e.target.innerHTML}}
            contenteditable="true" spellcheck="false"  style="height: {height}px; width: {width}px"> {content
                .replace(/<br\s*\/?>/gi, '') // Replace <br> or <br/> tags with \n
                .replace(/<div\s*\/?>/gi, '\n') // Replace <div> tags with \n
                .replace(/<\/div\s*\/?>/gi, '')}
        </div>
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
        font-size: 10pt;
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
        white-space: pre-wrap;
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