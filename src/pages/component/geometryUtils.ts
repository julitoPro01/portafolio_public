

export interface RotateProps{
    x:number,y:number,z:number,
    alpha:number,betha?:number,polar?:number
}
export interface PointCordsProps{
    x:number,y:number,z:number,i?:number
}

export const getRotate = ({x, y, z, alpha, betha, polar}:RotateProps):PointCordsProps => {
    let x1 = x;
    let y1 = y * Math.cos(alpha) - z * Math.sin(alpha);
    let z1 = y * Math.sin(alpha) + z * Math.cos(alpha);

    let x2 = x1, y2 = y1, z2 = z1;

    if (betha) {
        x2 = x1 * Math.cos(betha) + z1 * Math.sin(betha);
        y2 = y1;
        z2 = -x1 * Math.sin(betha) + z1 * Math.cos(betha);

        if (!polar)
            return { x: x2, y: y2, z: z2 }
    }

    if (polar) {
        return {
            x: x2 * Math.cos(polar) - y2 * Math.sin(polar),
            y: x2 * Math.sin(polar) + y2 * Math.cos(polar),
            z: z2
        }
    }

    return { x: x1, y: y1, z: z1 }

}

export const getCords_sphere = (num:number, r:number = 1):PointCordsProps[] => {

    let points = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 1; i < num; i++) {

        const theta = Math.acos(-1 + (2 * (i + 1)) / num);

        const phi = i * goldenAngle;

        const x0 = r * Math.sin(theta) * Math.cos(phi);
        const y0 = r * Math.sin(theta) * Math.sin(phi);
        const z0 = r * Math.cos(theta);

        points.push({ x: x0, y: y0, z: z0, i });


    }
    return points
}


const angle=Math.PI/180

export const rotateSphera = (cords:PointCordsProps[], alpha:number,betha:number):PointCordsProps[] => {
    const newCords:PointCordsProps[] = [];
    const angleAlpha = alpha * angle;
    const angleBetha = betha * angle;
    cords.forEach((num, i) => {

        const { x, y, z } = getRotate({x:num.x,y:num.y,z:num.z,
            alpha:angleAlpha,betha:angleBetha});

        newCords.push({ x, y, z, i })
    });

    return newCords
}
