import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table } from './Table'

const meta: Meta<typeof Table> = {
    title: 'composition/Table',
    component: Table,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: (
            <>
                <caption>
                    <code>Table</code> Caption
                </caption>
                <thead>
                    <tr>
                        <th>Table Heading 1</th>
                        <th>Table Heading 2</th>
                        <th>Table Heading 3</th>
                        <th>Table Heading 4</th>
                        <th>Table Heading 5</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Table Footer 1</th>
                        <th>Table Footer 2</th>
                        <th>Table Footer 3</th>
                        <th>Table Footer 4</th>
                        <th>Table Footer 5</th>
                    </tr>
                </tfoot>
                <tbody>
                    <tr>
                        <td>Table Cell 1</td>
                        <td>Table Cell 2</td>
                        <td>Table Cell 3</td>
                        <td>Table Cell 4</td>
                        <td>Table Cell 5</td>
                    </tr>
                    <tr>
                        <td>Table Cell 1</td>
                        <td>Table Cell 2</td>
                        <td>Table Cell 3</td>
                        <td>Table Cell 4</td>
                        <td>Table Cell 5</td>
                    </tr>
                    <tr>
                        <td>Table Cell 1</td>
                        <td>Table Cell 2</td>
                        <td>Table Cell 3</td>
                        <td>Table Cell 4</td>
                        <td>Table Cell 5</td>
                    </tr>
                    <tr>
                        <td>Table Cell 1</td>
                        <td>Table Cell 2</td>
                        <td>Table Cell 3</td>
                        <td>Table Cell 4</td>
                        <td>Table Cell 5</td>
                    </tr>
                </tbody>
            </>
        ),
    },
}
