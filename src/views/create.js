import { createTheater } from '../api/data.js';
import { html } from '../lib.js';

const createTemplate = (onSumbit) => html`
<section id="createPage">
    <form @submit=${onSumbit} class="create-form">
        <h1>Create Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" value="">
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year">
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author">
        </div>
        <div>
            <label for="description">Description:</label>
            <textarea id="description" name="description" placeholder="Description"></textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>`;

export function createPage(ctx) {
    ctx.render(createTemplate(onSumbit));

    async function onSumbit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const title = formData.get('title').trim();
        const date = formData.get('date').trim();
        const author = formData.get('author').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const description = formData.get('description').trim();

        if (title == '' || date == '' || author == '' || imageUrl == '' || description == '') {
            return alert('All fields are required!');
        }

        await createTheater({
                title,
                date,
                author,
                imageUrl,
                description
              });
        ctx.page.redirect('/');
    }
}