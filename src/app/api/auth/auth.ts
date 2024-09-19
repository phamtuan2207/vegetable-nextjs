import { NextResponse, NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';



export interface AuthenticatedRequest extends NextRequest {
    user?: JwtPayload | string;
}

type Handler = (request: AuthenticatedRequest) => Promise<NextResponse>;

const checkLogin = (handler: Handler): Handler => {
    return async (request: AuthenticatedRequest): Promise<NextResponse> => {
        const token = request.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ message: 'No token provided' }, { status: 401 });
        }

        try {
            const decoded = jwt.verify(token, '19120700');
            request.user = decoded;
            return handler(request);
        } catch (error) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
    };
};



const checkAdmin = (handler: Handler): Handler => {
    return async (request: AuthenticatedRequest): Promise<NextResponse> => {
        const token = request.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ message: 'No token provided' }, { status: 401 });
        }

        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            if (typeof decoded === 'object' && decoded.role !== 'admin') {
                return NextResponse.json({ message: 'Access denied' }, { status: 403 });
            }
            request.user = decoded;
            return handler(request);
        } catch (error) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
    };
};

export { checkLogin, checkAdmin };
