<script>
    import { draggable } from '@neodrag/svelte';
    import notepad from '$lib/images/notepad.png';


</script>

<div use:draggable={{ cancel: '.content' }} class="notepad">
    <div class="header">
        <img src={notepad} alt="notepad" class="notepadPic"/>
        <div class="title">*wassup - Notepad.exe</div>
    </div>
    <div class="content" contenteditable="true" spellcheck="false"> hi there</div>
</div>

<style>

    .notepadPic{
        width:20px;
        height:auto;
    }
    .header{
        padding-left:6px;
        display:flex;
        flex-direction: row;
    }
    .notepad{
        width:fit-content;
        font-size:14px;
        font-family:'Lucida Console';
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
</style>