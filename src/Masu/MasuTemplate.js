import { connect } from 'react-redux';
import { getMasu } from '../store';
import styles from './MasuTemplate.css';


function MasuTemplate(props) {
    const pageLength = parseFloat(props.pageLength);
    const pageWidth = parseFloat(props.pageWidth);

    const l = parseFloat(props.length);
    const w = parseFloat(props.width);
    const h = parseFloat(props.height);

    if (isNaN(l + w + h) || l <= 0 || w <= 0 || h <= 0) {
        return (
            <svg className="template" viewBox={`${-pageWidth / 2} ${-pageLength / 2} ${pageWidth} ${pageLength}`}></svg>
        );
    }

    const side = props.side ?? 'front';

    const max = l + 0.0 + w + 4.0 * h;

    const l_2 = l / 2.0;
    const w_2 = w / 2.0;
    const h_2 = h / 2.0;
    const max_2 = max / 2.0;

    const h2 = h * 2.0;
    const mark = 2.5;

    function Text(props) {
        let configuration = {textAnchor: "middle", dominantBaseline: "middle", x: null, y: null, rotate: null};
        const text = props.text;
        switch (text.face) {
            case 'front':
                configuration.x=0;
                configuration.y=l_2 + h_2;
                configuration.rotate=180;
                break;
            case 'back':
                configuration.x=0;
                configuration.y=-l_2 - h_2;
                configuration.rotate=0;
                break;
            case 'left':
                configuration.x=w_2 + h_2;
                configuration.y=0;
                configuration.rotate=90;
                break;
            case 'right':
                configuration.x=-w_2 - h_2;
                configuration.y=0;
                configuration.rotate=-90;
                break;
            default:
                console.log('text.face not supported');
            }
        return (
            <text textAnchor={configuration.textAnchor} dominantBaseline={configuration.dominantBaseline}
                x={configuration.x} y={configuration.y} transform={`rotate(${configuration.rotate} ${configuration.x} ${configuration.y})`}
                style={{ fontSize: text.size }}>
                {text.content}
            </text>
        );
    }
    
    if (side === 'front') {
        return (
            <svg className="template" viewBox={`${-pageWidth / 2} ${-pageLength / 2} ${pageWidth} ${pageLength}`} style={styles}>
                <g transform="rotate(45)">
                    <polygon className="cut" points={`0,-${max_2} ${max_2},0 0,${max_2} -${max_2},0`} />

                    <line className="flip" x1={-w_2 - h} y1={-l_2 - h} x2={w_2 + h} y2={-l_2 - h} />
                    <line className="flip" x1={-w_2 - h2} y1={-l_2} x2={w_2 + h2} y2={-l_2} />
                    <line className="flip" x1={-w_2 - h2} y1={l_2} x2={w_2 + h2} y2={l_2} />
                    <line className="flip" x1={-w_2 - h} y1={l_2 + h} x2={w_2 + h} y2={l_2 + h} />
                    <line className="inverted" x1={-w_2} y1={-l_2 - h2} x2={w_2} y2={-l_2 - h2} />
                    <line className="inverted" x1={-w_2} y1={l_2 + h2} x2={w_2} y2={l_2 + h2} />

                    <line className="flip" x1={-w_2 - h} y1={-l_2 - h} x2={-w_2 - h} y2={l_2 + h} />
                    <line className="flip" x1={-w_2} y1={-l_2 - h2} x2={-w_2} y2={l_2 + h2} />
                    <line className="flip" x1={w_2} y1={-l_2 - h2} x2={w_2} y2={l_2 + h2} />
                    <line className="flip" x1={w_2 + h} y1={-l_2 - h} x2={w_2 + h} y2={l_2 + h} />
                    <line className="inverted" x1={-w_2 - h2} y1={-l_2} x2={-w_2 - h2} y2={l_2} />
                    <line className="inverted" x1={w_2 + h2} y1={-l_2} x2={w_2 + h2} y2={l_2} />

                    <line className="inverted" x1={-w_2 - h} y1={-l_2 - h} x2={-w_2} y2={-l_2} />
                    <line className="inverted" x1={w_2 + h} y1={-l_2 - h} x2={w_2} y2={-l_2} />
                    <line className="inverted" x1={-w_2 - h} y1={l_2 + h} x2={-w_2} y2={l_2} />
                    <line className="inverted" x1={w_2 + h} y1={l_2 + h} x2={w_2} y2={l_2} />

                    <line className="mark" x1={0} y1={l_2 - h2 - w_2} x2={-mark} y2={l_2 - h2 - w_2 + mark} />
                    <line className="mark" x1={0} y1={l_2 - h2 - w_2} x2={mark} y2={l_2 - h2 - w_2 + mark} />
                    <line className="mark" x1={0} y1={l_2 - w_2} x2={-mark} y2={l_2 - w_2 + mark} />
                    <line className="mark" x1={0} y1={l_2 - w_2} x2={mark} y2={l_2 - w_2 + mark} />

                    <line className="mark" x1={0} y1={-l_2 + h2 + w_2} x2={-mark} y2={-l_2 + h2 + w_2 - mark} />
                    <line className="mark" x1={0} y1={-l_2 + h2 + w_2} x2={mark} y2={-l_2 + h2 + w_2 - mark} />
                    <line className="mark" x1={0} y1={-l_2 + w_2} x2={-mark} y2={-l_2 + w_2 - mark} />
                    <line className="mark" x1={0} y1={-l_2 + w_2} x2={mark} y2={-l_2 + w_2 - mark} />

                    <line className="mark" x1={w_2 - h2 - l_2} y1={0} x2={w_2 - h2 - l_2 + mark} y2={-mark} />
                    <line className="mark" x1={w_2 - h2 - l_2} y1={0} x2={w_2 - h2 - l_2 + mark} y2={mark} />
                    <line className="mark" x1={w_2 - l_2} y1={0} x2={w_2 - l_2 + mark} y2={-mark} />
                    <line className="mark" x1={w_2 - l_2} y1={0} x2={w_2 - l_2 + mark} y2={mark} />

                    <line className="mark" x1={-w_2 + h2 + l_2} y1={0} x2={-w_2 + h2 + l_2 - mark} y2={-mark} />
                    <line className="mark" x1={-w_2 + h2 + l_2} y1={0} x2={-w_2 + h2 + l_2 - mark} y2={mark} />
                    <line className="mark" x1={-w_2 + l_2} y1={0} x2={-w_2 + l_2 - mark} y2={-mark} />
                    <line className="mark" x1={-w_2 + l_2} y1={0} x2={-w_2 + l_2 - mark} y2={mark} />
                </g>
            </svg>
        );
    }
    else {
        return (
            <svg className="template" viewBox={`${-pageWidth / 2} ${-pageLength / 2} ${pageWidth} ${pageLength}`} style={styles}>
                <g transform="rotate(-45)">
                    <polygon points={`0,-${max_2 + 5} ${max_2 + 5},0 0,${max_2 + 5} -${max_2 + 5},0`} style={{
                        fill: props.detail.background
                    }} />

                    <polygon className="reference" points={`0,-${max_2} ${max_2},0 0,${max_2} -${max_2},0`} />

                    <line className="reference" x1={-w_2 - h} y1={-l_2 - h} x2={w_2 + h} y2={-l_2 - h} />
                    <line className="reference" x1={-w_2 - h2} y1={-l_2} x2={w_2 + h2} y2={-l_2} />
                    <line className="reference" x1={-w_2 - h2} y1={l_2} x2={w_2 + h2} y2={l_2} />
                    <line className="reference" x1={-w_2 - h} y1={l_2 + h} x2={w_2 + h} y2={l_2 + h} />
                    <line className="reference" x1={-w_2} y1={-l_2 - h2} x2={w_2} y2={-l_2 - h2} />
                    <line className="reference" x1={-w_2} y1={l_2 + h2} x2={w_2} y2={l_2 + h2} />

                    <line className="reference" x1={-w_2 - h} y1={-l_2 - h} x2={-w_2 - h} y2={l_2 + h} />
                    <line className="reference" x1={-w_2} y1={-l_2 - h2} x2={-w_2} y2={l_2 + h2} />
                    <line className="reference" x1={w_2} y1={-l_2 - h2} x2={w_2} y2={l_2 + h2} />
                    <line className="reference" x1={w_2 + h} y1={-l_2 - h} x2={w_2 + h} y2={l_2 + h} />
                    <line className="reference" x1={-w_2 - h2} y1={-l_2} x2={-w_2 - h2} y2={l_2} />
                    <line className="reference" x1={w_2 + h2} y1={-l_2} x2={w_2 + h2} y2={l_2} />

                    <line className="reference" x1={-w_2 - h} y1={-l_2 - h} x2={-w_2} y2={-l_2} />
                    <line className="reference" x1={w_2 + h} y1={-l_2 - h} x2={w_2} y2={-l_2} />
                    <line className="reference" x1={-w_2 - h} y1={l_2 + h} x2={-w_2} y2={l_2} />
                    <line className="reference" x1={w_2 + h} y1={l_2 + h} x2={w_2} y2={l_2} />

                    {props.text !== undefined && 
                        <Text text={props.text} />
                    }
                </g>
            </svg>
        );
    }
}

export default connect(state => getMasu(state))(MasuTemplate);
