import { getMyTheaters } from '../api/data.js'
import { html } from '../lib.js'
import { getUserData } from '../util.js'
 
const profileTemplate = (theaters, userData) => html`
    <section id="profilePage">
        <div class="userInfo">
            <div class="avatar">
                <img src="./images/profilePic.png">
            </div>
            <h2>${userData.email}</h2>
        </div>
        <div class="board">
            ${theaters.length == 0
                    ? html`
                        <div class="no-events">
                            <p>This user has no events yet!</p>
                        </div>
                        </div>
                        </section>`
                    : html`${theaters.map(profilePreview)}`
            }`
 
const profilePreview = (theater) => html`
    <div class="eventBoard">
        <div class="event-info">
            <img src="${theater.imageUrl}">
            <h2>${theater.title}</h2>
            <h6>${theater.date}</h6>
            <a href="/details/${theater._id}" class="details-button">Details</a>
        </div>
    </div>`
 
export async function profilePage(ctx) {
    const userData = getUserData()
    const theaters = await getMyTheaters(userData.id)
    ctx.render(profileTemplate(theaters, userData))
}