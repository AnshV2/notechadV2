<script>
    import { draggable } from '@neodrag/svelte';
    import notepad from '$lib/images/notepad.png';
    import UserButton from 'clerk-sveltekit/client/UserButton.svelte'
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';

    onMount(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        };
    });

    async function save() {
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
    }

    async function handleKeyDown(event) {
        // Check if Ctrl key and S key are pressed
        if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent default browser save action

       
        toast.promise(
            save(),
            {
                loading: 'Saving...',
                success: 'Succesfully saved!',
                error: 'Could not save.',
            }
        );



        // Call your custom command function here
        console.log("wassup")
        }
    }

    export let data;
    let notes = data.data

    $: noteFacts = notes.map(note => ({top: note.top, left: note.left, width: note.width, height: note.height, content: note.content, layer: 1}));
    
    

    let inName = "Name";


    let up = () => {
        for (let i = 0; i < notes.length; i++) {
            notes[i] = {name: notes[i].name, height: noteFacts[i].height, width: noteFacts[i].width, top: noteFacts[i].top, left: noteFacts[i].left, content: noteFacts[i].content}
        }
    }

</script>

<body>
<Toaster />

<input class="addName" bind:value={inName}>
<button class="add" on:click={async() => {
    let check = true;
    if (notes.length >= 10) {
        toast.error("Sorry bud you already got 10 notepads. Afraid I can't afford to let you have more.", {duration: 3000})
        check = false;
    }
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].name == inName) {
            check = false;
            toast.error("That Notepad name aint unique bud. Already Exists.", {duration: 2500})
        }
    }
    if (check == true) {

        const response = await fetch('/api/addnew', {
            method: 'POST',
            body: JSON.stringify({ name: inName, height: 400, width: 400, top: 300, left: 300, content: "enyoy" }),
            headers: {
                'content-type': 'application/json'
            }
        });

        let total = await response.json()

        for (let i = 0; i < noteFacts.length; i++) {
            notes[i].top = noteFacts[i].top;
            notes[i].left = noteFacts[i].left;
            notes[i].height = noteFacts[i].height;
            notes[i].width = noteFacts[i].width;
        }

        let fillerNotes = notes;
        let fillerNoteFacts = noteFacts;

        notes = [];
        notes = fillerNotes
        noteFacts = fillerNoteFacts

        notes = [...notes, { name: inName, height: 400, width: 400, top: 300, left: 300, content: "enyoy"}]
        toast.success("Succesfully created Notepad", {duration: 2000})
    }
}}>Create Notepad</button>


{#each notes as {top, left, width, height, content, name}, i}
    <button use:draggable={{ cancel: '.content', position: {x: notes[i].left, y: notes[i].top} }} class="notepad" style=" z-index: {noteFacts[i].layer}" 
    on:neodrag={e => {noteFacts[i].left = e.detail.offsetX}}
    on:neodrag={e => {noteFacts[i].top = e.detail.offsetY}}
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
            <button class="x" on:click={async () => {
                const response = await fetch('/api/delete', {
                    method: 'DELETE',
                    body: JSON.stringify({ name: name}),
                    headers: {
                        'content-type': 'application/json'
                    }
                });

                let total = await response.json()

                for (let i = 0; i < noteFacts.length; i++) {
                    notes[i].top = noteFacts[i].top;
                    notes[i].left = noteFacts[i].left;
                    notes[i].height = noteFacts[i].height;
                    notes[i].width = noteFacts[i].width;
                    notes[i].content = noteFacts[i].content;
                }

                notes = notes.filter(note => note.name !== name)
                toast.success("Succesfully deleted Notepad", {duration: 2000})
            }}>x</button>
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

    .x{
        all:unset;
        padding-bottom: 4px;
        font-weight:lighter;
        font-weight: 20;
        font-size: 16pt;
        position:absolute;
        text-align: center;
        width:45px;
        height:25px;
        right: 0%;
        color:grey;
        transition: 0.1s;
    }
    .x:hover{
        background-color:red;
        color:white;
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
    .notepad{
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


    .addName{
        all: unset;
        margin-left: 0.5vh;
        margin-top: 0.5vh;;
        background-color: white;
        color: black;
        border: 2px solid darksalmon;
        padding: 5px 10px;
        text-decoration: none;
        display: inline-block;
        border-radius: 5px;
    }

    .add{
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

    .add:hover{
        background-color:darksalmon;
        color: white;
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