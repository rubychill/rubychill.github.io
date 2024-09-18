export interface Vector {
    x: number;
    y: number;
}

export const add = (v1: Vector, v2: Vector) => {
    return { x: v1.x + v2.x, y: v1.y + v2.y };
}

export const sub = (v1: Vector, v2: Vector) => {
    return { x: v1.x - v2.x, y: v1.y - v2.y };
}

export const times = (v1: Vector, s: number) => {
    return { x: v1.x * s, y: v1.y * s };
}

export const abs = (v: Vector) => {
    return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
}

export const dot = (v1: Vector, v2: Vector) => {
    return { x: v1.x * v2.x, y: v1.y * v2.y };
}

export const cross = (v1: Vector, v2: Vector) => {
    return v1.x * v2.y - v1.y * v2.x
}

export const unit = (v: Vector) => {
    const length = abs(v);
    return { x: v.x / length, y: v.y / length };
}

export const intersection = (p: Vector, r: Vector, q: Vector, s: Vector) => {
    const t = cross(sub(q, p), s) / cross(r, s);
    const u = cross(sub(p, q), r) / cross(s, r);

    if (cross(r, s) === 0) {
        // parallel or
        if (cross(sub(q, p), r) === 0) {
            // collinear
            return { intersection: q, t, u };
        } else {
            // parallel
            return null;
        }
    } else {
        return { intersection: add(p, times(r, t)), t, u };
    }
}

export const rayLineIntersection = (p1: Vector, v1: Vector, l1: Vector, l2: Vector) => {
    const lineDirection = unit(sub(l2, l1));
    const int = intersection(p1, v1, l1, lineDirection);

    if (int && int.t >= 0 && int.u >= 0) {
        const lineLength = abs(sub(l2, l1));
        const intLength = abs(sub(int.intersection, l1));
        if (intLength <= lineLength) {
            return int.intersection;
        }
    }
    return null;
}

export const deg2rad = (deg: number) => deg * (Math.PI / 180);
export const rad2deg = (rad: number) => rad * (180 / Math.PI);