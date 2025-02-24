export function draggable(node: HTMLElement, data: { index: number, onDragEnd: () => void })
{
    let state = data;

    node.draggable = true;
    node.style.cursor = 'grab';

    let onDragStart = (e: DragEvent) => {
        (e.target as HTMLElement).classList.add('dragging');   
    };
    
    let onDragEnd = (e: DragEvent) => {
        (e.target as HTMLElement).classList.remove('dragging');
    };

    node.addEventListener('dragstart', onDragStart);
    node.addEventListener('dragend', onDragEnd);

    return {
        update(data: any) {
            state = data;
        },
        destry() {
            node.removeEventListener('dragstart', onDragStart);
            node.removeEventListener('dragend', onDragEnd);
        }
    }
}

export function dropzone(node: HTMLElement, options?: any)
{
    let state = {
        dropEffect: 'move',
        dragOverClass: 'droppable',
        ...options
    }

    node.addEventListener('dragover', (e: DragEvent) => {
        e.preventDefault();
        
        const draggable = document.querySelector('.dragging');

        if(!draggable)
            return;

        let belowElement = getElementBelow(node, e.clientY);

        if(belowElement == null) {
            node.appendChild(draggable);
        } else if(draggable) {
            node.insertBefore(draggable, belowElement);
            
        }
    });
    
}

function getElementBelow(container: HTMLElement, y: number): HTMLElement | null
{
    let draggingItems = [...container.querySelectorAll('[draggable="true"]:not(.dragging)')];

    let belowElement = draggingItems.reduce<any>((closest, item) => {
        const box = item.getBoundingClientRect();
        const offset = y - (box.top + box.height / 2);

        if(offset < 0 && offset > closest.offset){
            return { offset: offset, element: item }
        } else {
            return closest;
        }

    },  { offset: Number.NEGATIVE_INFINITY });

    return belowElement.element;
}