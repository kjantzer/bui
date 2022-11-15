import { html, css } from 'lit'
import 'bui/elements/hardcover-book'
import 'bui/elements/hardcover-book-2d'
import 'bui/elements/sparkline'
import 'bui/elements/comment'

let imgs = [
    'https://cdn.blackstonepublishing.com/cdn-cgi/image/width=240,quality=75/c/k/ck5w/ck5w-rectangle.jpg',
    'https://cdn.blackstonepublishing.com/cdn-cgi/image/width=240,quality=75/c/e/cepn/cepn-rectangle.jpg'
]

export default html`
<section title="Specialty">

<!-- <b-paper> -->
    <b-h1>Hardcover Book</b-h1>

    <b-grid cols="1,1,2" cols-mobile=1>

        <b-hardcover-book-2d src=${imgs[0]}></b-hardcover-book-2d>
        <b-hardcover-book-2d src=${imgs[1]}></b-hardcover-book-2d>

        <b-hr colspan></b-hr>
    
        <div>
            <b-text block>3D Default</b-text>

            <b-hardcover-book>
                <img slot="cover-img" src="${imgs[0]}">
            </b-hardcover-book>
        </div>
        
        <div>
            <b-text block>3D Animated</b-text>

            <b-hardcover-book animated>
                <img slot="cover-img" src="${imgs[1]}">
                <div slot="inside">
                    Hello
                </div>
            </b-hardcover-book>
        </div>

        <div>
            <b-text block>3D Open</b-text>

            <b-hardcover-book open>
                <div slot="inside">
                    An Open Book
                </div>
            </b-hardcover-book>
        </div>

    </b-grid>

</b-paper>

<b-paper>
    <b-h1>Sparkline</b-h1>

    <b-grid cols="4" cols-mobile=2>
        <b-sparkline value="1,3,4,2,8,10,3"></b-sparkline>
        <b-sparkline value="0,0,0,1,2,0,40,54,80"></b-sparkline>
    </b-grid>

</b-paper>

<b-paper>
    <b-h1>Comment</b-h1>

    <b-comment>
        <b-avatar initials="JD" slot="avatar"></b-avatar>
        <b-text slot="header">Jane Doe</b-text>
        <div>A comment</div>
    </b-comment>
    <b-comment last>
        <b-avatar initials="KJ" slot="avatar"></b-avatar>
        <b-text slot="header">New Comment</b-text>
        <div>Nothing to see here yet</div>
    </b-comment>

</b-paper>

<b-paper>
    <b-h1>Timeline</b-h1>

    <div>
        <b-timeline-horz>
            <div slot="date">Aug 10</div>
            <b-icon name="ok-circled" slot="bubble" style="color: var(--green)"></b-icon>
            <div>Timeline content</div>
        </b-timeline-horz>
        <b-timeline-horz>
            <div slot="date">Aug 27</div>
            <b-icon name="cancel-1" slot="bubble" style="color: var(--red)"></b-icon>
            <div>Timeline content</div>
        </b-timeline-horz>
        <b-timeline-horz style="--b-timeline-line-display:none;">
            <div slot="date">Sept 24</div>
            <div>Timeline content</div>
        </b-timeline-horz>
    </div>
</b-paper>

<b-paper>
    <b-h1>Carousel</b-h1>
    <b-carousel>
        <div><b-paper color="gray" outline block>Slide 1</b-paper></div>
        <div><b-paper color="gray" outline block>Slide 2</b-paper></div>
        <div><b-paper color="gray" outline block>Slide 3</b-paper></div>
    </b-carousel>

    <b-text sm italic muted><b-icon name="info-circled"></b-icon> This is a very basic implementation</b-text>

<!-- </b-paper> -->


</section>
`

export const styles = css`
    b-hardcover-book {
        margin-top: 1.5em;
        /* margin-right: 2em; */
    }

    b-hardcover-book[open] {
        transform: translateX(100%);
    }

    b-hardcover-book [slot="inside"] {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    b-hardcover-book-2d {
        width: 160px;
    }
`