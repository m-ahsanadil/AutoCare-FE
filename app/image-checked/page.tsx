import React from 'react'

export default function ImageCheckedPage() {
    return (
        <div>
            <form action={'/upload'} method='POST' encType='multipart/form-data'>
                <input type='file' name='profileImage' />
                <button type='submit'>Upload</button>
            </form>
            
        </div>
    )
}
