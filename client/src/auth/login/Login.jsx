import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { Label } from "@radix-ui/react-label";
import { Smile } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const { signInPopup, user } = useAuth()
    const navigate = useNavigate()
    console.log(user);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (e) => {
        console.log(e);
    };

    const handleGoogleLogin = async() => {
        console.log("login");
        try {
            await signInPopup()
            toast.success("Login Successful")

            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-11/12 md:w-10/12 mx-auto">
            <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#f0f3f8] ">
                <Card className="w-full max-w-md shadow-lg rounded-2xl bg-white">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold">Welcome Back</CardTitle>
                        <p className="text-center text-gray-500 text-sm">Sign in to continue</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register("email")}
                                    name="email"
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    {...register("password")}
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
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
                        <Button onClick={handleGoogleLogin} variant="outline" className="w-full mt-4 flex items-center justify-center gap-2" >
                            <Smile size={20} />
                            Sign in with Google
                        </Button>
                    </CardContent>
                    <CardFooter>
                        <Label htmlFor="password">No have an account? <Link to="/auth/register" className="text-blue-500 hover:underline">Register</Link></Label>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Login