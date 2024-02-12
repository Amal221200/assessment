import { useReducer } from "react";
import { bubbleSort, capitalize, insertionSort, mergeSort, quickSort, randomizeArray, selectionSort, shellSort } from "../utils/functions";
import { Chart as ChartJS, Tooltip, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar } from "react-chartjs-2";

const initialState = {
    data: [
        23, 72, 81, 90, 86, 90, 39, 71, 29, 69, 82, 60,
        73, 35, 88, 26, 96, 96, 90, 16, 26, 98, 18, 0,
        42, 88, 39, 71, 25, 7, 63, 48, 58, 56, 27, 93,
        93, 38, 8, 81, 75, 17, 85, 90, 81, 88, 100, 97,
        93, 3, 40, 14, 35, 28, 96, 15, 6, 8, 32, 93,
        73, 6, 30, 60, 32, 30, 28, 87, 8, 28, 21, 33,
        3, 23, 13, 58, 90, 9, 11, 74, 64, 70, 17, 28,
        16, 33, 21, 58, 69, 99, 95, 38, 42, 36, 97, 92,
        62, 80, 94, 7
    ],
    thickness: 25
}

const reducer = (state, action) => {
    if (action.type === 'bubble') {
        return { ...state, data: bubbleSort(state.data) };
    }
    else if (action.type === 'insertion') {

        return { ...state, data: insertionSort(state.data) };
    }
    else if (action.type === 'selection') {
        return { ...state, data: selectionSort(state.data) };
    }
    else if (action.type === 'quick') {
        return { ...state, data: quickSort(state.data) };
    }
    else if (action.type === 'merge') {
        return { ...state, data: mergeSort(state.data) };
    }
    else if (action.type === 'shell') {
        return { ...state, data: shellSort(state.data) };
    }
    else if (action.type === 'resize') {
        const thickness = state.thickness == 25 ? 15 : 25
        return { ...state, thickness };
    }
    else {
        // console.log("random");
        return { ...state, data: randomizeArray(state.data) };
    }
}

ChartJS.register(CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
);

const buttons = ['random array', 'merge sort', 'quick sort', 'selection sort', 'insertion sort', 'bubble sort', 'shell sort', 'resize']

const Main = () => {
    const [state, dispatch] = useReducer(reducer, { ...initialState, data: initialState.data.slice(0, 40) });

    return (
        <main className="w-[80vw] border-[5px]">
            <section className="flex justify-center gap-3 px-1 my-2">
                {
                    buttons.map((button) => (
                        <button key={button} onClick={() => dispatch({ type: button.split(" ")[0] })} className="p-1 bg-gray-100 rounded">
                            {capitalize(button)}
                        </button>
                    ))
                }
            </section>
            <Bar data={{
                labels: state.data,
                datasets: [{ data: state.data, barThickness: state.thickness, backgroundColor: "rgba(255, 99, 132, 0.5)", }]
            }}
                options={{ scales: { y: { beginAtZero: true } }, responsive: true }}
            />
        </main>
    );
}

export default Main;