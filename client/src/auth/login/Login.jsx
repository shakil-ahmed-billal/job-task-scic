import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Smile } from "lucide-react";
import { useState } from "react";
import { Link } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
    };
    
    return (
        <div className="w-11/12 md:w-10/12 mx-auto">
            <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
                <Card className="w-full max-w-md shadow-lg rounded-2xl bg-white">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold">Welcome Back</CardTitle>
                        <p className="text-center text-gray-500 text-sm">Sign in to continue</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <Link href="/forgot-password" className="text-blue-500 hover:underline">
                                    Forgot password?
                                </Link>
                                <Link href="/register" className="text-blue-500 hover:underline">
                                    Create an account
                                </Link>
                            </div>
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                        </form>
                        <div className="mt-4 flex items-center justify-center">
                            <div className="w-full border-t border-gray-300"></div>
                            <span className="px-2 text-sm text-gray-500">or</span>
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <Button variant="outline" className="w-full mt-4 flex items-center justify-center gap-2">
                            <Smile size={20} />
                            Sign in with Google
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login