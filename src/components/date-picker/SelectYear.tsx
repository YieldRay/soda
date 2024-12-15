import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ripple } from '@/ripple/ripple-effect'

const Ul = styled.ul`
    all: unset;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-items: center;
    -webkit-tap-highlight-color: transparent; // remove webkit blue tap effect
`

const Cell = styled.div`
    display: inline-block;
    width: 76px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 2rem;
    color: var(--md-sys-color-on-surface-variant);
    overflow: hidden;
    transition: all 200ms;
    user-select: none;
`

const Li = styled.li<{ active: boolean }>`
    all: unset;
    display: grid;
    width: 100%;
    place-items: center;
    padding: 6px 0;
    cursor: pointer;
    overflow: hidden;

    @media (any-hover: hover) {
        &:hover {
            background: rgba(0 0 0 / 0.04);
        }
    }

    &:active {
        background: rgba(0 0 0 / 0.08);
    }

    ${(props) =>
        props.active &&
        css`
            & > ${Cell} {
                background: var(--md-sys-color-primary);
                color: var(--md-sys-color-on-primary);
            }
        `}
`

export function SelectYear({
    current,
    onChange,
}: {
    current: number
    onChange?: (year: number) => void
}) {
    return (
        <Ul>
            {getClosest15Years(current).map((year) => (
                <Li
                    active={current === year}
                    onClick={() => onChange?.(year)}
                    key={year}
                    ref={(el) => el && ripple(el)}
                >
                    <Cell>
                        {
                            new Intl.DateTimeFormat(undefined, {
                                year: 'numeric',
                            }).formatToParts(new Date(year, 1, 1))[0].value
                        }
                    </Cell>
                </Li>
            ))}
        </Ul>
    )
}

function getClosest15Years(year: number): number[] {
    const result: number[] = []
    let begin = year - 7
    for (let i = 0; i < 15; i++) {
        result.push(begin++)
    }
    return result
}
